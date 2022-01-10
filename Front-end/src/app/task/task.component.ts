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

  exemplo: Back = {
    key: "OK",
    texto: "OK"
  }
  tarefa: Back = new Back();
  allKeys: BackKeys[];
  value: Back[] = [this.exemplo];

  constructor(private back: BackService) { }

  ngOnInit() {
    window.scroll(0,0)
    this.getAllKeys();
  }

  getAllKeys(){
    this.back.getAllKeys().subscribe((resp: BackKeys[]) => {
      this.allKeys = resp
      for(var i = 0; i < resp.length; i++){ 
        this.getAllValue(this.allKeys[i].toString(), i)
      }
    });
  }

  getAllValue(key: String, i: number){
      this.back.getAllValue(key).subscribe((resp: Back)=> {
        this.value[i] = {
          key: key,
          texto: resp.texto
        }
    });
  }

  postTarefa(back: Back){
    console.log()
    this.back.postTarefa(back).subscribe((resp: Back)=>{
      alert("Postagem efetuada")
    })
  }
}
