import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'todos',
  template: `<tasks></tasks>`
})
export class TodosComponent implements OnInit {

  public tasks = [

    {
      title: 'Verein',
      subTasks: [
        { cssClass: 'danger', title: 'Club-History: Farbe der Eingabe' },
        { cssClass: 'danger', title: 'Anzeige der Daten des Hauptvereins (Mitgliederdaten)' }
      ]
    },
    {
      title: 'Mitglieder und Mannschaften',
      subTasks: [
        {
          cssClass: 'danger', title: 'Nächstes Spiel (letzte Spiele gegen dieses Team, Serien von Siegen oder\n' +
          '  Niederlagen, Livebericht, Schiedsrichter, Fotos des Spiels, Timeline mit den Toren und Karten)'
        },
        { cssClass: 'warning', title: 'Wie spielten die Mannschaften z.B. im Pokal gegeneinander' },
        { cssClass: 'danger', title: 'Wie hat die A-Jugend im Pokal gegen die Mannschaft gespielt' },
        {
          cssClass: 'warning',
          title: 'Wie hat dieser Jahrgang in den Jahren zuvor gegen diese Mannschaft abgeschnitten'
        },
        { cssClass: 'danger', title: 'Wettervorhersage für die nächsten Tage' },
        { cssClass: 'warning', title: 'Torjäger, Vorlagengeber (benötigt Artikel bzw. Match-Auswertungen)' },
        { cssClass: 'danger', title: 'Anzeigen der Spielstatistik (benötigt Artikel bzw. Match-Auswertungen)' }
      ]
    },
    {
      category: 'sponsors',
      title: 'Sponsoren',
      subTasks: [
        { cssClass: 'warning', title: 'Filter-Funktion erzeugt leere Filteransicht' },
        { cssClass: 'warning', title: 'Link zum Erstellen eines neuen Sponsors klappt nicht' }
      ]
    },
    {
      title: 'Mediencenter',
      subTasks: [
        { cssClass: 'danger', title: 'Dateien in eine Galerie verschieben -> Datei wird doppelt angezeigt' },
        { cssClass: 'warning', title: 'Medien-Upload (Videos)' },
        { cssClass: 'danger', title: 'Unsplash.com Integration -> load remote image' },
        { cssClass: 'warning', title: 'Beim Click auf eine Galerie wird die Gesamtzahl nicht mehr korrekt angezeigt' }
      ]
    },
    {
      category: 'articles',
      title: 'Artikel und Spiele',
      subTasks: [
        {
          cssClass: 'warning',
          title: 'Übersicht: Letzte Spiele, neue Spielberichte, fehlende Ergebnisse, Pie-Chart nach Kategorien'
        },
        { cssClass: 'danger', title: 'Sidebar - handelt es sich um ein Spiel -> siehe Match' },
        { cssClass: 'warning', title: 'Vorbericht, Nachbericht' },
        { cssClass: 'danger', title: 'Festlegen des Datums, Uhrzeit, Titel' },
        { cssClass: 'warning', title: 'Liveticker (auf der Seite / externer Link)' },
        {
          cssClass: 'danger',
          title: 'Heim&ndash; und Gastmannschaft, Schiedsrichter, Ergebnis, Startaufstellung, ' +
          'Auswechselungen, Karten, Torschützen, sonstige Vorkommnisse'
        }
      ]
    },
    {
      title: 'Dorfturnier',
      subTasks: [
        {
          cssClass: 'danger', title: 'Allgemeine Daten ' +
          '(Beginn, Ende des Turniers), was ist das Dorfturnier, erfolgreichste Sieger'
        },
        { cssClass: 'warning', title: 'Spielplan als Download' },
        { cssClass: 'danger', title: 'Download der Anträge zur Mannschaftsmeldung, Online-Anmeldung' },
        { cssClass: 'warning', title: 'Satzung und Regelwerk als HTML-Ansicht und als Download (PDF)' },
        {
          cssClass: 'danger', title: 'Vorstellung der ' +
          'Bands (Flyer, Videos, Youtube-Links, Text), Export in ical, Programmhinweise (Text)'
        },
        {
          cssClass: 'warning', title: 'Vorstellung der ' +
          'Mannschaften (Spielfarbe, Mannschaftsfoto, Einzelfotos, Text, bisherige Erfolge)'
        },
        { cssClass: 'danger', title: 'Spielpaarungen (evtl. automatischer Generator)' },
        { cssClass: 'warning', title: 'Tabellenstände (evtl. automatische Berechnung)' },
        { cssClass: 'warning', title: 'Sieger des letzten Jahres (Fotos mit Links zu den Mannschaften)' }
      ]
    },
    {
      title: 'Benutzer',
      subTasks: [
        { cssClass: 'danger', title: 'Anmeldung mit sozialen Netzwerken (FB, Google+, Twitter)' },
        { cssClass: 'warning', title: 'E-Mail an Administratoren zur Freischaltung des Accounts' },
        {
          cssClass: 'danger', title: 'Benutzergruppen ' +
          '(mindestens Gast, freigeschaltete Benutzer und Administratoren)'
        },
        { cssClass: 'warning', title: 'Benutzerrollen (Redakteure, Team-Leiter, Administratoren)' },
        { cssClass: 'danger', title: 'Benutzerliste (Sperren, Aktivieren von Accounts, Rechte zuweisen)' }
      ]
    },
    {
      title: 'Sonstiges',
      subTasks: [
        { cssClass: 'danger', title: 'Summernote: Wird nicht angezeigt, wenn das Feld leer ist' },
        { cssClass: 'danger', title: 'Startseite: Beim Speichern eines Ergebnisses erscheint der Eintrag doppelt' },
        { cssClass: 'warning', title: 'Kontaktformular' },
        {
          cssClass: 'danger', title: 'Cronjobs: Geburtstagserinnerung, ' +
          'Spieler der Woche, Mannschaft des Monats, Ehrenmitglied der Saison,\n' +
          '  Sponsor des Monats'
        },
        {
          cssClass: 'warning', title: 'Veranstaltungen -> ' +
          'Flyer hochladen, Plakate / Flyer etc. auf der Startseite anzeigen'
        },
        { cssClass: 'danger', title: 'Sport-Nachrichten aus aller Welt' },
        { cssClass: 'warning', title: 'Tags, Kommentare, Likes, Social Sharing (Facebook, Twitter, Email)' },
        { cssClass: 'danger', title: 'Mitglied (AH, Jugend, Aktive, Frauen, Ehren-) & Mannschaft des Monats' }
      ]
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
