import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from 'src/app/models/image';
import { SportField } from 'src/app/models/sport-field';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-specific-sport-field-images',
  templateUrl: './specific-sport-field-images.component.html',
  styleUrls: ['./specific-sport-field-images.component.css'],
})
export class SpecificSportFieldImagesComponent implements OnInit {
  @Input() sportField: SportField;

  @Output() imagesChangeMessage = new EventEmitter<string>();
  @Output() primaryImageChange = new EventEmitter<string>();

  noImagePath: string = '../../../../assets/images/sport_field_no_image.jpg';
  images: Array<Image>;
  imageToDelete: Image;

  tryToAddImage: boolean = false;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.getAllBySportFieldId(this.sportField.id).subscribe((images: Array<Image>) => {
      this.images = images;
    });
  }

  onPrepareImageUpload(): void {
    this.tryToAddImage = true;
  }

  onImageUpload(event: any) {
    const uploadedImage = event.target.files[0];
    const imageFormData = new FormData();
    imageFormData.append('image', uploadedImage, uploadedImage.name);

    this.imageService.upload(this.sportField.id, imageFormData).subscribe({
      next: (image: Image) => {
        this.images.push(image);
        this.tryToAddImage = false;
        this.imagesChangeMessage.emit('New image uploaded');
      },
      error: (_e: HttpErrorResponse) => {
        this.imagesChangeMessage.emit('Error while uploading image');
      },
    });
  }

  onPrepareDeleteImage(image: Image): void {
    this.imageToDelete = image;
  }

  onDeleteImage(): void {
    this.imageService.delete(this.sportField.id, this.imageToDelete.name).subscribe({
      next: () => {
        this.images = this.images.filter((image) => image !== this.imageToDelete);
        this.imagesChangeMessage.emit('Image deleted');
      },
      error: (_e: HttpErrorResponse) => {
        this.imagesChangeMessage.emit('Error while deleting image');
      },
    });
  }

  onSetPrimaryImage(image: Image): void {
    this.sportField.primaryImageName = image.name;
    this.primaryImageChange.emit(image.name);
  }

  isImagePrimary(image: Image): boolean {
    return image.name === this.sportField.primaryImageName;
  }
}
