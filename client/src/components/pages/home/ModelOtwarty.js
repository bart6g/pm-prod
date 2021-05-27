import React from "react";
import daneO from "../../../images/daneO.png";
import czasO from "../../../images/czasO.png";
import schematO from "../../../images/schematO.png";
import schematOAPP from "../../../images/schematOAPP.png";
import symulacjaO from "../../../images/symulacjaO.png";
import wykresO from "../../../images/wykresO.png";
import polaczeniaO from "../../../images/polaczeniaO.png";

const ModelOtwarty = () => {
  return (
    <div>
      <h3>Model matematyczny dla układu otwartego TTM</h3>
      <p>
        W poniższym poradniku stworzono układ otwarty opierający się o dwa
        reaktory elementarne. Schemat takiego układu można przedstawić
        następująco:
      </p>
      <img src={schematO} alt="" />
      <p>Przyjęto następujące dane początkowe:</p>
      <img src={daneO} alt="" />
      <p>
        Aby zasymulować taki układ, należy wybrać rodzaj układu „Otwarty”.
        Domyślnie w polu edycji pojawią się dwa elementy – „wejście” i
        „wyjście”, które imitują przepływ przez układ. Ich położeniem można
        dowolnie manipulować. Dodatkowo stworzono dwa reaktory przyciskiem
        „dodaj”, nazwano je odpowiednio „reaktor I” i „reaktor II”.
      </p>
      <img src={schematOAPP} alt="" />
      <p>Następnie zdefiniowano połączenia:</p>
      <img src={polaczeniaO} alt="" />
      <p>
        Model zaakceptowano. Należy teraz przejść do zakładki symulacja, gdzie
        jeszcze raz można przeanalizować dane oraz dodać nowy set.
      </p>
      <img src={symulacjaO} alt="" />
      <p>
        Po kliknięciu „nowy set”, dodany zostanie nowy formularz, do którego
        należy uzupełnić nowe dane dla symulacji. Po zatwierdzeniu sprawdzone
        zostaną warunki równości sum strumieni wpływających i wypływających.
        Należy następnie zdefiniować krok czasowy i czas symulacji. Przyjęto
        czas 120s i krok czasowy 1s.
      </p>
      <img src={czasO} alt="" />
      <p>
        Następnie w zakładce wyniki można analizować wykresy oraz pobrać dane w
        postaci pliku .csv. Poniżej zaprezentowano wyniki dla ustandaryzowanych
        stężeń obydwu reaktorów:
      </p>
      <img src={wykresO} alt="" />
    </div>
  );
};

export default ModelOtwarty;
