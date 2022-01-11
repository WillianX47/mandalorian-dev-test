import { Component, OnInit } from '@angular/core';
import { Back } from '../model/Back';
import { BackKeys } from '../model/BackKeys';
import { AlertasService } from '../service/alertas.service';
import { BackService } from '../service/back.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})

export class TaskComponent implements OnInit {
  exemplo: Back = {
    key: 'ExemploDeTitulo',
    texto: 'Exemplo de texto',
  };
  tarefa: Back = new Back();
  allKeys: BackKeys[];
  value: Back[] = [this.exemplo];
  titulo: String = ''
  cor: String = ''

  constructor(private back: BackService, private alerta: AlertasService) {}

  ngOnInit() {
    window.scroll(0, 0);
    this.getAllKeys();
  }

  onKeyUp(evento: KeyboardEvent){
    const regex = /\W[+]|_/;
    this.titulo = ((<HTMLInputElement>evento.target).value)
    if(
      regex.test(this.titulo.toString()) == false &&
      this.titulo.length >= 10 &&
      this.titulo.length <= 20
    ){
      this.cor = 'verde'
    } else {
      this.cor = 'vermelho'
    }
  }

  validarTarefa(back: Back) {
    const regex = /\W[+]|_/;
    if (
      regex.test(back.key.toString()) == false &&
      back.key.length >= 10 &&
      back.key.length <= 20
    ) {
      this.postTarefa(back);
    } else {
      this.alerta.msg(
        'Não é permitido entrada de caracteres especiais no título! o titulo deve ser maior que 10 e menor que 20 letras'
      );
    }
  }

  getAllKeys() {
    this.back.getAllKeys().subscribe((resp: BackKeys[]) => {
      this.allKeys = resp;
      for (var i = 0; i < resp.length; i++) {
        this.getAllValue(this.allKeys[i].toString(), i);
      }
    });
  }

  getAllValue(key: String, i: number) {
    this.back.getAllValue(key).subscribe((resp: Back) => {
      this.value[i] = {
        key: key,
        texto: resp.texto,
      };
    });
  }

  postTarefa(back: Back) {
    this.alerta.msg("Tarefa criada!")
    this.back.postTarefa(back).subscribe(() => {
      setTimeout(function(){location.reload()}, 1500);
    });
  }

  delTarefa(key: String) {
    setTimeout(function(){location.reload()}, 1500);
    this.alerta.msg("Tarefa concluída!")
    this.back.delTarefa(key).subscribe(() => {});
  }
}
