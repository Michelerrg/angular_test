import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiUtilService } from 'src/services/api-util.service';

@Component({
  selector: 'app-codice-fiscale',
  templateUrl: './codice-fiscale.component.html',
  styleUrls: ['./codice-fiscale.component.css']
})
export class CodiceFiscaleComponent implements OnInit {

  result: string = '';
  addClass: string = 'danger';
  formCF: FormGroup | any;
  optionMF: string[] = ['', 'M','F'];
  cities: any[];
  province: string[] = [];
  charDispari: any[];
  charPari: any[];
  cin: any[];

  constructor(private formBuilder: FormBuilder, private apiUtil: ApiUtilService) { }

  ngOnInit(): void {
    this.createFormCF();
    this.getAllCities();
  }

  getAllCities() {
    this.apiUtil.getCities().subscribe({
      next: (res) => {
        this.cities = res;
        this.cities.forEach(city => {
          if (!this.province.includes(city.provincia)) {
            this.province.push(city.provincia);
          }
        });
        return this.province.sort();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getCharDispari() {
    this.apiUtil.getDispariChar().subscribe({
      next: (res) => {
        this.charDispari = res;
        return this.charDispari;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getCharPari() {
    this.apiUtil.getPariChar().subscribe({
      next: (res) => {
        this.charPari = res;
        return this.charPari;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getAllCin() {
    this.apiUtil.getCharCodifica().subscribe({
      next: (res) => {
        this.cin = res;
        return this.cin;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  createFormCF() {
    this.formCF = this.formBuilder.group({
      cognome: ['', Validators.required],
      nome: ['', Validators.required],
      sesso: ['', Validators.required],
      luogoNascita: ['', Validators.required],
      provincia: ['', Validators.required],
      dataNascita: ['', Validators.required]
    })
  }

  checkCF() {
    if(this.formCF.valid) {
      this.addClass = 'dark fs-2 mt-2 mb-2';
      this.result = this.calcoloCF();
      if(this.result != '') {
        this.createFormCF();
      }
      else {
        this.addClass = 'danger';
        this.result = "Città e provincia non corrispondono";
      }
      
    }
    else {
      this.addClass = 'danger';
      this.result = "Compila tutti i campi richiesti!";
    }
  }

  calcoloCF(): string {
    let cognome = this.estraiCognome(this.formCF.value.cognome);
    let nome = this.estraiNome(this.formCF.value.nome);
    let etaSesso = this.estraiEtaNascitaSesso(this.formCF.value.dataNascita, this.formCF.value.sesso);
    let codCatasto = this.estraiCodiceCatasto(this.formCF.value.luogoNascita, this.formCF.value.provincia);
    if(codCatasto != '') {
      let quindiciChar = cognome + nome + etaSesso + codCatasto;
      let cin = this.estraiCarattereDiControllo(quindiciChar);
      let codiceFiscale = quindiciChar + cin;
      return codiceFiscale;
    }
   else {
      return '';
   }
  }

  private estraiCognome(extractStr: string): string {

    extractStr = extractStr.trim();
    let result = '';
    let middleResult = '';
    let consonanti = this.estraiConsonanti(extractStr);
    let vocali = this.estraiVocali(extractStr);

    switch(consonanti.length < 3) {
      case true:
        middleResult = consonanti + vocali;
        result = middleResult.slice(0,3);
      break;
      default:
        result = consonanti.slice(0,3);
    }

    if(result.trim().length < 3) {
      result = result + 'X';
    }

    return result;
  }

  private estraiNome(extractStr: string): string {

    extractStr = extractStr.trim();
    let result = '';
    let middleResult = '';
    let consonanti = this.estraiConsonanti(extractStr);
    let vocali = this.estraiVocali(extractStr);

    switch(consonanti.length) {
      case 3:
        result = consonanti;
      break;
      case 2 || 1:
        middleResult = consonanti + vocali;
        result = middleResult.slice(0,3);
      break;
      case 0:
        middleResult = vocali;
        result = middleResult.slice(0,3);
      break;
      default:
        result = consonanti.slice(0,1) + consonanti.slice(2,4);
    }

    if(result.trim().length < 3) {
      result = result + 'X';
    }

    return result;
  }

  private estraiConsonanti(extractStr: string): string {
    let result = '';
    for(let i = 0; i < extractStr.length; i++) {
      let caratteri = extractStr[i];
      if (!'AEIOU'.includes(caratteri.toUpperCase()) && /[A-Z]/.test(caratteri.toUpperCase())) {
        result += caratteri.toUpperCase();
      }
    }
    return result;
  }

  private estraiVocali(extractStr: string): string {
    let result = '';
    for(let i = 0; i < extractStr.length; i++) {
      let caratteri = extractStr[i];
      if ('AEIOU'.includes(caratteri.toUpperCase()) && /[A-Z]/.test(caratteri.toUpperCase())) {
        result += caratteri.toUpperCase();
      }
    }
    return result;
  }

  private estraiEtaNascitaSesso (dataNascita: string, sesso: string): string {
    let result = '';
    let data = new Date(dataNascita);
    let anno = data.getFullYear().toString().substring(2);
    let meseCode = this.estraiCodiceMese(data.getMonth() + 1);
    let giornoNascita = data.getDate();
    if(sesso == 'F') giornoNascita += 40;
    let giorno = ('0' + giornoNascita).slice(-2);
    result = anno + meseCode + giorno;
    return result;
  }

  private estraiCodiceMese(mese: number): string {
    let codeMonths = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];
    return codeMonths[mese - 1];
  }

  private estraiCodiceCatasto(citta: string, provincia: string): string {
    let result = '';
    this.cities.forEach(c => {
      if (c.descrizione.trim() == citta.trim() && c.provincia.trim() == provincia.trim()) {
        result = c.codicecatastale;
      }
    })

    return result;
  }

  private estraiCarattereDiControllo(quindiciChar: string): string {
    this.getCharDispari();
    this.getCharPari();
    this.getAllCin();
    let sediciChar = '0' + quindiciChar;
    let somma = 0;
    let result = '';
    for(let i = 1; i <= 15; i++) {
      let carattere = sediciChar.charAt(i);
      if(i % 2 === 0) {
        somma += this.estraiNumCharPari(carattere);
      }
      else {
        somma += this.estraiNumCharDispari(carattere);
      }
    }
    let resto = somma % 26;
    result = this.estraiCin(resto);
    return result;
  }

  private estraiNumCharDispari(carattere: string): number {
    let result = 0;

    this.charDispari.forEach(d => {
      if (carattere.trim() === d.carattere.trim()) {
        result = d.valore;
      }
    });

    return result;
  }

  private estraiNumCharPari(carattere: string): number {
    let result = 0;
    this.charPari.forEach(p => {
      if (carattere.trim() === p.carattere.trim()) {
        result = p.valore;
      }
    });
    return result;
  }

  private estraiCin(resto: number): string {
    let result = '';
    this.cin.forEach(c => {
      if (resto === c.numero) {
        result = c.lettera;
      }
    });
    return result;
  }
}
