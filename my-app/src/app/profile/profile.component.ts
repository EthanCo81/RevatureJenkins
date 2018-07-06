import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Profile } from 'src/app/profile';
import { Employee } from 'src/app/employee';
import { ProfileService } from '../profile.service';
import { Instructor } from '../instructor';
import { Client } from 'src/app/client';

import { EmployeeService } from 'src/app/employee.service';
import { InstructorService } from 'src/app/instructor.service';
import { ClientService } from 'src/app/client.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() profile: Profile;
  constructor(
    private profileService: ProfileService,
    private employeeService: EmployeeService,
    private instructorService: InstructorService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
    
   }

  employee: Employee;
  instructor: Instructor;
  client: Client;
  ngOnInit() {
    //TODO: Change to recognize what type of person is logged in (employee, instructor, or client)
    const id = +this.route.snapshot.paramMap.get('id');

    /*if (id) {
      this.profileService.getEmp(id).subscribe(
          emp => this.employee = emp);
    }*/
    this.client = this.clientService.getClient();
    this.employee = this.employeeService.getEmployee();
    this.instructor = this.instructorService.getInstructor();
  }
  
  isClient(): boolean{
    return this.clientService.isClient();
  }
  isInstructor(): boolean {
    return this.instructorService.isInstructor();
  }
  isEmployee(): boolean {
    return this.employeeService.isEmployee();
  }

  editEmp(): void {
    // this.router.navigate('/profile/edit/' + this.employee.id);
    this.router.navigate(['/profile/edit', this.employee.id]);
  }

  editIns(): void {
    // this.router.navigate('/profile/edit/' + this.instructor.id);
    this.router.navigate(['/profile/edit', this.instructor.id]);
  }

  editCln(): void {
    // this.router.navigate('/profile/edit/' + this.client.id);
    this.router.navigate(['/profile/edit', this.client.id]);
  }

}