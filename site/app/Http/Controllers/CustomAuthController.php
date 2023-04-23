<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

use Illuminate\Support\Facades\Hash;



use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
/**Run `composer require laravel/ui` to install Laravel's UI package.
 * Run `php artisan ui vue --auth` to generate the authentication views and routes.
 * Run `npm install && npm run dev` to compile the frontend assets. 
*/

class CustomAuthController extends Controller
{
    //Not needed. Not a server rendered site.
    // public function login(){
    //     return view("auth.login");
    // }

    // public function registration(){
    //     return view("auth.registration");
    // }
    // public function login(Request $requests){
    //     return response()->json([
    //         "success" => true
    //     ]);
    // }


    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    // $validator = Validator::make($request->all(), [
    //     'first_name' => 'required|string|between:2,100',
    //     'last_name' => 'required|string|between:2,100',
    //     'phone_num' => 'required|string|between:2,100',
    //     'email' => 'required|string|email|max:100|unique:users',
    //     'password' => 'required|string|confirmed|min:6',
    // ]);
    // if($validator->fails()){
    //     return response()->json($validator->errors()->toJson(), 400);
    // }
    // $user = User::create(array_merge(
    //             $validator->validated(),
    //             ['password' => bcrypt($request->password)]
    //         ));
    // return response()->json([
    //     'message' => 'User successfully registered',
    //     'user' => $user
    // ], 201);


    public function registerUser(Request $request){

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|between:2,100',
            'last_name' => 'required|string|between:2,100',
            'phone_num' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
            'points' => 0,
            'details' => NULL,
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);

        // try{
        //     $user=new User;
        //     $user->first_name=$request->first_name;
        //     $user->last_name=$request->last_name;
        //     $user->dob=$request->dob;
        //     // $user->nationality=NULL;
        //     $user->email=$request->email;
        //     $user->phone_num=$request->phone_num;
        //     $pass=$request->password;
        //     $user->password=hash("sha256",$pass);
        //     $user->points=0;
        //     $user->email_created_at=Carbon::now();
        //     $user->email_verified_at=NULL;
        //     $user->details=NULL;

        //     // Generate a random token of size 10
        //     $token = Str::random(10);
        //     $user->token = $token;
        //     $user->token_expiration=NULL;

        //     $user->save();
        // }
        // catch (\Exception $e) {
        //     // Code to handle the exception goes here
        //     return response()->json(['error' => $e->getMessage()], 500);
        //     // return response()->json([
        //     //     "success" => false
        //     // ]);
        // }
        

        // return response()->json([
        //     "success" => true
        // ]);
    }

    use AuthenticatesUsers, ThrottlesLogins;
    public function loginUser(Request $request)
    {
        $credentials = $request->only('email', 'password');

        // Add rate limiting
        $maxAttempts = 5;
        $decayMinutes = 5;
        $this->incrementLoginAttempts($request);
        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);
            return response()->json([
                'success' => false,
                'message' => 'Too many login attempts. Please try again in ' . $decayMinutes . ' minute(s).',
            ]);
        }

        $hashedPassword = hash("sha256", $request->password);
        $user = User::where('email', $request->email)->where('password', $hashedPassword)->first();

        if ($user) {
            // Clear rate limiting
            $this->clearLoginAttempts($request);
            return response()->json([
                "success" => true,
            ]);
        } else {
            // Add failed login attempt to rate limiting
            $this->incrementLoginAttempts($request);
            return response()->json([
                "success" => false,
                "message" => "Invalid email or password",
            ]);
        }
    }


    public function getEmail(Request $request){
        $email = $request->email;
        $record = DB::table('registered_users')->where('email', $email)->first();

        if (is_null($record)) {
            return response()->json([
                "success" => false
            ]);
        } 
        else {
            return response()->json([
                "success" => true
            ]);
        }
    }

    public function changePassword(Request $request){
        /*TODO Ask: Can I find the user based off their ID instead
         * Instead of using a query builder to find the user based off their email can the frontend send the
         * users's DB id that is autoincrement?
        */

        //How this works: Frontend sends a post request containing 2 pieces of information, the user's email
        //and the user's new password
        //If the password is the same as the one in the DB, return failure otherwise return success
        $email = $request->email;
        $newPassword = hash("sha256",$request->password);
        $password = DB::table('registered_users')->where('email', $email)->value('password');
        if ($password == $newPassword){
            return response()->json([
                "success" => false
            ]);
        }
        else{
            $newData = [
                'password' => $newPassword,
                'updated_at' => Carbon::now(),
            ];
            DB::table('registered_users')->where('email',$email)->update($newData);
            
            return response()->json([
                "success" => true
            ]);
        }
    }

    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->createNewToken($token);
    }
    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password)],
                    ['token' => Str::random(40)],
                    ['token_expiration' => now()->addDays(7)]
                ));
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }
    
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        return response()->json(auth()->user());
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60 * 24, // Change this line
            'user' => auth()->user()
        ]);
    }
       
}


