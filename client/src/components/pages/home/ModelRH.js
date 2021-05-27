import React from "react";
import img1 from "../../../images/schematRH.png";
import daneRH from "../../../images/daneRH.png";
import ukladRH from "../../../images/ukladRH.png";
import polaczenie from "../../../images/połaczeniaRH.png";
import ukladRHAPP from "../../../images/ukladRHAPP.png";
import symulacjaRH from "../../../images/symulacjaRH.png";
import czasRH from "../../../images/czasRH.png";
import wykresRH from "../../../images/wykresRH.png";

const ModelRH = () => {
  return (
    <div>
      <h3>
        Model matematyczny procesu mieszania kąpieli metalowej w urządzeniu RH
      </h3>
      <p>Poniżej zaprezentowano Schemat modelu matematycznego:</p>
      <img src={img1} alt="Schemat modelu RH" />
      <p>Przyjęto następujące dane początkowe:</p>
      <img src={daneRH} alt="Dane RH" />
      <p>
        W programie wybrano rodzaj układu – zamknięty. Dodano trzy reaktory
        (poprzez przycisk „Dodaj”), nazwano je odpowiednio - reaktor I, reaktor
        II, reaktor III.
      </p>
      <img src={ukladRH} alt="Układ RH" />
      <p>
        Następnie zdefiniowano połączenia (1-3, 3-2, 2-3, 2-1). Połączenie i-j
        należy wykonać następujaco. W reaktorze i-tym, kliknąć białą strzałkę
        (pojawi się linia), przeprowadzić linię do czarnej strzałki j-tego
        reaktora i kliknąć ją.{" "}
      </p>
      <img src={polaczenie} alt="Polaczenia RH" />
      <p>
        W poszczególnych reaktorach pojawiły się nowe pola do zdefiniowania –
        wartości strumieni, jak w tabeli powyżej. Następnie uzupełniono
        wszystkie dane według danych początkowych.
      </p>
      <img src={ukladRHAPP} alt="Układ RH z aplikacji" />
      <p>
        Następnie kliknięto „Sprawdź i zatwierdź”. Model został zaakceptowany.
        Po przejściu do zakładki symulacji, jeszcze raz można zobaczyć dane
        przez nas wprowadzone.
      </p>
      <img src={symulacjaRH} alt="Symulacja RH" />
      <p>
        Aby zdefiniować nowe symulacje dla tego samego modelu, należy wcisnąć
        przycisk „Nowy set”, po czym pojawi się nowy formularz wprowadzania
        danych. Po kliknięciu „Walidacja”, nastąpi sprawdzenie danych dla nowo
        wprowadzonych symulacji i przejście do okna wprowadzania danych
        czasowych. Dla tego przykładu przyjęto czas obliczeń 400s oraz krok
        czasowy 1.5s.
      </p>
      <img src={czasRH} alt="Czas RH" />
      <p>
        Po przejściu do zakładki wyniki, możemy sterować wykresem – dodając lub
        odejmując stężenia, które nas interesują. Poniżej zaprezentowano
        ustandaryzowane wyniki dla stężenia znacznika w reaktorze II (żółty) i
        reaktorze III (fioletowy).
      </p>
      <img src={wykresRH} alt="Wykresy RH" />
    </div>
  );
};

export default ModelRH;
