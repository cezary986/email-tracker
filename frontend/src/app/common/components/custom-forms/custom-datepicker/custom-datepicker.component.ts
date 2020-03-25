import { Component, ViewChild, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material';
import { generateUuid } from 'src/app/common/utils/uui';

@Component({
  selector: 'app-custom-datetimepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.scss']
})
export class CustomDateTimePickerComponent implements OnInit {

  public pickedTime: {
    hours: number,
    minutes: number
  } = {
    hours: null,
    minutes: null
  };
  public timePickerElementId: string = null;
  private wasTimePicked = false;
  public pickedDate: Date;
  public opened = false;
  public emited = false;
  @Output() valueChange: EventEmitter<Date> = new EventEmitter();
  @ViewChild('picker', null) datePicker: MatDatepicker<any>;

  @Input() time = false;
  @Input() min: Date = null;
  @Input() max: Date = null;
  public timeStringInitial = '12:00';

  @Input() set initialValue(dateString: string) {
    if (dateString !== null && dateString !== undefined) {
      const date = new Date(dateString);
      this.datePicker.select(date);
      this.pickedDate = date;
      if (this.time) {
        this.pickedTime.hours = date.getHours();
        this.pickedTime.minutes = date.getMinutes();
        this.timeStringInitial = this.pickedTime.hours + ':' + this.pickedTime.minutes + ':00';
      }
    }
  }
  private container: any;
  private timepickerElement: any;

  ngOnInit(): void {
    this.pickedTime = this.parseTime(this.timeStringInitial);
    this.datePicker.openedStream.subscribe((res) => {
      this.opened = true;
    });
    if (this.time) {
      this.timePickerElementId = generateUuid();
    }
    this.datePicker.closedStream.subscribe((res) => {
      this.opened = false;
      if (this.time) {
        this.container.appendChild(this.timepickerElement);
        if (this.wasTimePicked && !this.emited) {
          this.valueChange.emit(this.prepareValue());
        }
      }
    });
  }

  public open() {
    this.datePicker.open();

    if (this.time) {
      this.timepickerElement = document.getElementById(this.timePickerElementId);
      this.container = this.timepickerElement.parentNode;
      const datePickerContainer = document.querySelectorAll('.mat-datepicker-content')[0];
      datePickerContainer.insertAdjacentElement('afterbegin', this.timepickerElement);
    }
  }

  public select(date: Date) {
    this.datePicker.select(date);
  }

  public onTimeChange(time: string) {
    this.wasTimePicked = true;
    this.pickedTime = this.parseTime(time);
  }

  private parseTime(timeString: string): { hours: number, minutes: number } {
    const tmp = timeString.split(':');
    const hoursStirng = tmp[0];
    const minutesString = tmp[1];
    return {
      hours: parseInt(hoursStirng, 10),
      minutes: parseInt(minutesString, 10)
    };
  }

  public prepareValue(): Date {
    if (this.pickedDate === undefined) {
      this.pickedDate = new Date();
    }
    this.pickedDate.setHours(this.pickedTime.hours);
    this.pickedDate.setMinutes(this.pickedTime.minutes);
    return this.pickedDate;
  }

}
