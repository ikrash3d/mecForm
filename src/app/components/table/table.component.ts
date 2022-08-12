import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormValueInterface } from 'src/app/interface/form-value-interface';
import { DataHandlerService } from 'src/app/services/data-handler.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public tableDataSource = new MatTableDataSource<FormValueInterface[]>();
  public showMatDialog: boolean;
  private deletedRowId: string;

  displayedColumns: string[] = [
    'Groupe',
    'Equipe',
    'Essai',
    'Distance (cm)',
    'O Dep',
    'P rt',
    'O rec',
    'S',
    'T es (s)',
    'X',
    'Z',
    'Y',
    'M prot (g)',
    'M tran (g)',
    'E',
    'T ins (s)',
    'Penalty',
    'Delete',
  ];

  constructor(private dataHandler: DataHandlerService) {
    this.tableDataSource = new MatTableDataSource();
    this.showMatDialog = false;
    this.deletedRowId = '';
  }

  ngOnInit(): void {
    const fetchedData = this.dataHandler.getData();
    fetchedData.forEach((snap) => {
      this.tableDataSource = new MatTableDataSource<FormValueInterface[]>(
        snap as any
      );
    });
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  public deleteRow(row: FormValueInterface): void {
    this.deletedRowId = row.id!;
    this.openDialog();
  }

  public deleteData(): void {
    if (this.deletedRowId === undefined || '') {
      return;
    }
    this.dataHandler.deleteData(this.deletedRowId);
  }

  private openDialog(): void {
    Swal.fire({
      title: 'Voulez-vous supprimer ces données?',
      text: 'La suppression sera définitive!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      allowOutsideClick: false,
      backdrop: true,
    }).then((response: SweetAlertResult) => {
      if (response.value) {
        this.deleteData();
        Swal.fire({
          title: 'Les données ont été correctement supprimées',
          icon: 'success',
          confirmButtonText: 'Ok',
          allowOutsideClick: true,
          backdrop: true,
        });
      }
    });
  }
}
