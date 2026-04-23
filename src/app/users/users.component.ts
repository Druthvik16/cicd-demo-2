import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from './user.model';
import { UsersService } from './user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  users: User[] = [];
  loading = false;
  showForm = false;
  editingId: number | null = null;

  form: User = { name: '', email: '', role: 'user', city: '' };

  constructor(private usersService: UsersService) {}

  ngOnInit() { this.loadUsers(); }

  loadUsers() {
    this.loading = true;
    this.usersService.getAll().subscribe({
      next: (data) => { this.users = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openCreate() {
    this.editingId = null;
    this.form = { name: '', email: '', role: 'user', city: '' };
    this.showForm = true;
  }

   openEdit(user: User) {
    this.editingId = user.id!;
    this.form = { name: user.name, email: user.email, role: user.role, city: user.city };
    this.showForm = true;
  }


  save() {
    if (this.editingId) {
      this.usersService.update(this.editingId, this.form).subscribe(() => {
        this.showForm = false;
        this.loadUsers();
      });
    } else {
      this.usersService.create(this.form).subscribe(() => {
        this.showForm = false;
        this.loadUsers();
      });
    }
  }

  delete(id: number) {
    if (confirm('Delete this user?')) {
      this.usersService.delete(id).subscribe(() => this.loadUsers());
    }
  }

  getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

}
