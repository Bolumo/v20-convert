v12 – README (Aktualisierte Fassung ohne Structured Outputs)
Überblick
Diese Web-App konvertiert hochgeladene PDF-Lebensläufe (max. ~5 Seiten) automatisch in ein einheitliches Format (z. B. DOCX).
Anstelle von „Structured Outputs“ (OpenAI) wird ein Template verwendet, das die User im Browser bearbeiten. Das Template beinhaltet Platzhalter und kann frei editiert oder verschoben werden.

Kernfunktionen
Textextraktion: pdf-parse (oder Tesseract OCR als Fallback)
Browser-Template: Nutzer:innen passen ein vorgegebenes CV-Template an (Platzhalter, Layout).
Prompt-Eingabe (optional): Für zusätzliche Bearbeitung oder Korrektur kann ein Prompt an eine API gesendet werden, der die Template-Daten und den extrahierten Text nutzt.
Download: Der final bearbeitete Inhalt wird zu .docx konvertiert und steht sofort als Download zur Verfügung.
Keine Datenhaltung: Nach Abschluss wird alles verworfen.
Ziel
Hauptziel
PDF-Lebensläufe automatisiert in ein bearbeitbares Format bringen (DOCX), mit minimalem Aufwand.

Minimaler Overhead
Firebase Authentication zur Absicherung (nur eingeloggte User können konvertieren).
Leichter Server (Node.js, Vercel oder Cloudflare) für Upload, Textextraktion, OCR und DOCX-Generierung.
Template-Editor & Prompt
Template mit Platzhaltern, das User im Browser anpassen können.
Optionales Prompt-Feld: Ermöglicht die Einbindung einer API (z. B. OpenAI) zur weiteren Textbearbeitung – allerdings ohne Structured-Output-Schema.
Funktionsweise – Vom Groben ins Genaue
1. Firebase zur Authentication
Frontend: Firebase Authentication (E-Mail/Passwort, Social Logins).
Backend: Validierung des Firebase-ID-Tokens bei jeder Anfrage. Nur eingeloggte User können PDF hochladen und konvertieren.
2. PDF-Upload
Nach dem Login kann eine PDF (max. 5 Seiten) hochgeladen werden.
Upload erfolgt per HTTP POST an den Server.
Wichtig: PDF wird nur im RAM gehalten – keine Speicherung auf dem Server.
3. Textextraktion
Direkte Extraktion: z. B. pdf-parse oder pdf2json.
Fallback-OCR: Tesseract, falls kein Text-Layer gefunden wird.
Ergebnis: Rohtext, liegt nur temporär im Speicher.
4. Template-Erstellung & Browser-Editor
Ein vordefiniertes Template (HTML) wird dem Nutzer bereitgestellt. Darin existieren Platzhalter (z. B. für Name, Anschrift, Berufserfahrung).
Rohtext einfügen: Die extrahierten Inhalte können vom Server ins Template übertragen werden (z. B. über Platzhalter oder manuelles Einfügen).
Editing: User kann das Template anpassen, Blöcke verschieben, Texte verändern.
5. Prompt-Eingabe (Optional)
Neben dem Template-Editor kann der/die User:in einen Prompt eingeben – etwa „Bitte passe den Text an, um ihn formaler klingen zu lassen“.
Beim Klick auf „API ausführen“ werden folgende Daten ans Backend gesendet:
Aktuelles Template (HTML oder eine interne Struktur)
Extrahierter Text (oder bereits gemergter Text)
User-Prompt
Das Backend kann dann eine beliebige API (z. B. OpenAI) aufrufen, um den Text zu überarbeiten. Kein Structured-Output-Schema nötig.
Das angepasste Ergebnis wird zurückgeliefert und erneut im Editor angezeigt.
6. DOCX-Download
Wenn der Nutzer zufrieden ist, klickt er auf „Download DOCX“.
Das finale HTML (aus dem Editor) wird an einen /docx-Endpoint geschickt.
Dort wandelt ein Tool wie html-to-docx den Inhalt in eine .docx-Datei und schickt sie direkt zurück.
Keine Datenablage: Serverseitig wird nichts gespeichert.
Technologie-Stack
Frontend
React (oder ähnliches)
Firebase Auth SDK zum Login
CKEditor (oder ähnlicher WYSIWYG-Editor) für die Template-Bearbeitung
Optional: react-beautiful-dnd oder ähnliche Libraries zum Verschieben von Blöcken
axios für die Kommunikation mit dem Backend
Backend
Node.js (Express) / Vercel / Cloudflare Workers
pdf-parse, pdf2json oder tesseract.js für Textextraktion
(Optional) OpenAI oder eine andere API zur Textverarbeitung (ohne Structured Outputs)
html-to-docx für die DOCX-Erzeugung
Keine Datenbank, alle Daten nur im RAM
Mögliche API-Struktur
POST /upload
Auth-Check
Multipart-Form: Nimmt PDF entgegen
Textextraktion (pdf-parse / Tesseract)
Gibt Rohtext zurück (oder direkt ein vorbefülltes Template mit eingetragenem Text)
POST /reprocess (optional)
Auth-Check
Nimmt Template + Prompt + (ggf. extrahierten Text) entgegen
Ruft eine Textverarbeitungs-API auf (z. B. OpenAI)
Gibt das aktualisierte Template (HTML) zurück
POST /docx
Auth-Check
Empfängt das finale Template (HTML)
Konvertiert HTML → DOCX
Schickt die .docx-Datei direkt als Download
Projektablauf
Firebase-Konfiguration

Neues Firebase-Projekt für Authentication (E-Mail/Passwort)
Frontend: Login/Logout mit Firebase SDK
Backend

Node.js-/Express-Server oder Vercel/Cloudflare-Konfiguration
Implementierung von /upload, /reprocess (optional), /docx
Integration von pdf-parse / tesseract.js und html-to-docx
Frontend-Implementierung

Upload-Komponente: PDF hochladen
Template-Editor: Anzeige & Bearbeitung des Lebenslauf-Templates
Prompt-Feld (optional): Eingabe eines Verbesserungsvorschlags
Buttons: „API ausführen“ (falls Textverarbeitung gewünscht), „Download DOCX“
Testen

Kleinere PDFs hochladen (max. 5 Seiten)
OCR-Fallback bei gescannten PDFs
Template-Bearbeitung prüfen
Prompt-Funktion (falls verwendet) ausprobieren
Rollout

Nur eingeloggte Teammitglieder nutzen die Anwendung
PDFs werden ohne Speicherung direkt zu DOCX konvertiert
Hinweise & Einschränkungen
OCR-Performance: Tesseract kann bei mehreren Seiten langsam sein, für ~5 Seiten in der Regel akzeptabel
Keine Persistenz: Schließt man den Browser-Tab, ist alles weg
Keine Rollenverwaltung: Alle eingeloggten User haben gleiche Rechte
Datenschutz: Keine Speicherung von PDF- oder Textdaten – alles verbleibt im RAM. Bei externer Nutzung (z. B. OpenAI) ist rechtlich zu prüfen
Beispiel-Projektstruktur
bash
Code kopieren
v12/
├── backend/
│   ├── .env                     # Environment Variables
│   ├── server.js                # Express-/Node.js-Server
│   ├── handlers/
│   │   ├── upload.js            # /upload (Textextraktion)
│   │   ├── reprocess.js         # /reprocess (Template + Prompt -> API)
│   │   ├── docx.js              # /docx (HTML->DOCX)
│   │   └── authMiddleware.js    # Firebase ID Token Prüfung
│   ├── libs/
│   │   ├── pdfParser.js         # pdf-parse + Tesseract
│   │   ├── textApi.js           # Aufruf an externe Textverarbeitung (OpenAI, etc.)
│   │   ├── templateManager.js   # Falls Template-Logik ausgelagert werden soll
│   │   └── htmlToDocx.js        # HTML->DOCX
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx        # Firebase Auth Login
│   │   │   ├── Upload.jsx       # Upload-Form
│   │   │   ├── TemplateEditor.jsx # Editor mit Platzhaltern + Prompt
│   │   │   ├── FinalView.jsx    # Zeigt finalen CV an, Download-Link
│   │   │   └── Home.jsx         # Routing / Haupt-Workflow
│   │   ├── App.jsx              # Routing & Auth
│   │   └── index.js             # React Entry
│   ├── public/
│   │   └── index.html
│   └── package.json
└── README.md
