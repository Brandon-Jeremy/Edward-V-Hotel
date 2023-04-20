import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {
  @Input() reservation: any;
  @Output() updateReservation = new EventEmitter<any>();
  @Output() cancelEdit = new EventEmitter<void>();

  editReservationForm: FormGroup;
  rooms = ['Deluxe Room', 'Standard Room', 'Suite'];

  constructor() {
    this.editReservationForm = new FormGroup({
      room: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.editReservationForm.setValue({
      room: this.reservation.room,
      time: this.reservation.time.toISOString().substring(0, 16),
    });
  }

  onSubmit(): void {
    const updatedReservation = {
      id: this.reservation.id,
      room: this.editReservationForm.value.room,
      time: new Date(this.editReservationForm.value.time),
    };
    this.updateReservation.emit(updatedReservation);
  }

  onCancel(): void {
    this.cancelEdit.emit();
  }
}
