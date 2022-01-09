import { Component, OnInit } from '@angular/core';
import { Back } from '../model/Back';
import { BackKeys } from '../model/BackKeys';
import { BackService } from '../service/back.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  allKeys: BackKeys[];
  value: Back;

  constructor(private back: BackService) { }

  ngOnInit() {
    window.scroll(0,0)
    this.getAllKeys();
  }

  getAllKeys(){
    this.back.getAllKeys().subscribe((resp: BackKeys[]) => {
      this.allKeys = resp;
      console.log(this.allKeys)
    });
  }

  getAllValue(){
      this.back.getAllValue("Tarefa").subscribe((resp: Back)=> {
        this.value = resp;
        console.log(this.value)
    });
  }

}
