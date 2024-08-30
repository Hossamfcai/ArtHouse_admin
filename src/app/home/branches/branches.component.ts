import { Component, OnInit } from '@angular/core';
import { Branch, BranchService } from '../../services/branch.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css',
})
export class BranchesComponent implements OnInit {
  constructor(private _branchService: BranchService) {}
  branches: Branch[] = [];
  Base_Url: string = 'http://localhost:3000/';
  addForm!: FormGroup;
  ngOnInit(): void {
    this._branchService.getBranches().subscribe((data) => {
      this._branchService.updateBranches(data);
      this.branches = this._branchService.getAllBranches();
    });

    this.addForm = new FormGroup({
      branchImg: new FormControl(null),
      branchName: new FormControl(''),
    });
  }
  onFileChangeProduct(event: any) {
    const file = event.target.files[0];
    this.addForm.patchValue({ branchImg: file });
  }
  addBranch() {
    const formData = new FormData();
    formData.append('branchImg', this.addForm.get('branchImg')?.value);
    formData.append('branchName', this.addForm.get('branchName')?.value);

    this._branchService.addBranch(formData).subscribe((data) => {
      this._branchService.updateBranches(data);
      this.branches = this._branchService.getAllBranches();
    });
    this.addForm.patchValue({ branchImg: null, branchName: '' });
  }
  deleteBranch(id: string) {
    this._branchService.deleteBranch(id).subscribe((data) => {
      this._branchService.updateBranches(data);
      this.branches = this._branchService.getAllBranches();
    });
  }
}
