import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppointmentPost } from 'src/app/models/appointment-post';
import { GetFilteredPostsRequest } from 'src/app/models/requests/get-filtered-posts-request';
import { AppointmentPostService } from 'src/app/services/appointment_post/appointment-post.service';
import { FilterAndSortPostsDialogComponent } from './filter-and-sort-posts-dialog/filter-and-sort-posts-dialog.component';

@Component({
  selector: 'app-appointment-posts',
  templateUrl: './appointment-posts.component.html',
  styleUrls: ['./appointment-posts.component.css'],
})
export class AppointmentPostsComponent implements OnInit {
  appointmentPosts: Array<AppointmentPost>;
  filterAndSortOptions: any = {};
  searchFieldName: string;

  loaded: boolean = false;

  constructor(private appointmentPostService: AppointmentPostService, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  onAppointmentPostUpdated(): void {
    this.router.navigateByUrl('/profile');
  }

  openFilterAndSortDialog(): void {
    let filterAndSortOptions = { ...this.filterAndSortOptions };
    if (!filterAndSortOptions) {
      filterAndSortOptions = {};
    }

    const dialogRef = this.dialog.open(FilterAndSortPostsDialogComponent, {
      data: { filterAndSortOptions: filterAndSortOptions },
    });

    dialogRef.afterClosed().subscribe((newFilterAndSortOptions) => {
      if (newFilterAndSortOptions) {
        for (let option in newFilterAndSortOptions) {
          if (newFilterAndSortOptions[option]) {
            this.filterAndSortOptions[option] = newFilterAndSortOptions[option];
          } else {
            delete this.filterAndSortOptions[option];
          }
        }
        this.getFilteredPosts(false);
      }
    });
  }

  removeFilterOption(option: any): void {
    delete this.filterAndSortOptions[option];
    this.getFilteredPosts(false);
  }

  onSearch(): void {
    if (this.searchFieldName) {
      this.getFilteredPosts(true);
    }
    this.searchFieldName = '';
  }

  onReset(): void {
    this.searchFieldName = '';
    this.filterAndSortOptions = {};
    this.getAllPosts();
  }

  private getAllPosts(): void {
    this.appointmentPostService.getAllAppointmentPostsWithFreeSlots().subscribe((appointmentPosts) => {
      this.appointmentPosts = appointmentPosts;
      this.loaded = true;
    });
  }

  private getFilteredPosts(forSearch: boolean): void {
    this.loaded = false;

    const getFilteredPostsRequest = {
      minPrice: this.filterAndSortOptions['minPrice'],
      maxPrice: this.filterAndSortOptions['maxPrice'],
      country: this.filterAndSortOptions['country'],
      city: this.filterAndSortOptions['city'],
      name: forSearch ? this.searchFieldName : undefined,
      type: this.filterAndSortOptions['type'],
    } as GetFilteredPostsRequest;

    this.appointmentPostService.getFilteredAppointmentPostsWithFreeSlots(getFilteredPostsRequest).subscribe((appointmentPosts) => {
      this.appointmentPosts = appointmentPosts;
      this.loaded = true;
    });
  }
}
