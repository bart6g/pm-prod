import React, { useState, useContext } from "react";
import { TankContext } from "../../../context/tankContext";
import { ModelLearnContainer } from "./modelElements";
import { FaArrowAltCircleLeft } from "react-icons/fa";
export const ModelLearn = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { reactorType } = useContext(TankContext);
  return (
    <ModelLearnContainer isOpen={isOpen}>
      <FaArrowAltCircleLeft
        onClick={() => setIsOpen(!isOpen)}
        toolTip="Samouczek"
      />
      {isOpen ? (
        <>
          {reactorType === "open" ? (
            <>
              <ol>
                <h3>Układ otwarty</h3>
                <li>
                  Dodaj nowe podobszary, w tym celu kliknij przycisk "Dodaj",
                  opcjonalnie reaktory mogą zostać nazwane.{" "}
                </li>
                <li>
                  Aby zdefiniować kierunek przepływu połącz podobszary. Strumień
                  wypływający z reaktora musi zaczynać się w białej strzałce
                  reaktora i musi zostać poprowadzony do czarnej strzałki
                  reaktora docelowego. Po każdym połączeniu pojawi się w
                  reaktorze nowe pole do zdefiniowania wartości przeływu.
                </li>
                <li>
                  Uzupełnij wartość strumienia Vw, charakteryzującego kierunek
                  przepływu.
                </li>
                <li>
                  Uzupełnij wartości początkowe: masę i objętość pozostałych
                  reaktorów. Następnie uzupełnij wartości strumieni.
                </li>
                <li>
                  Kliknij przycisk "Sprawdź i zatwierdź". W przypadku błędu
                  walidacji (suma strumieni wpływających do reaktora musi być
                  równa sumie wypływających), należy poprawić wartości strumieni
                </li>
              </ol>
            </>
          ) : (
            <>
              <ol>
                <h3>Układ zamknięty</h3>
                <li>
                  Dodaj nowe podobszary, w tym celu kliknij przycisk "Dodaj",
                  opcjonalnie reaktory mogą zostać nazwane.
                </li>
                <li>
                  Połącz podobszary. Strumień wypływający z reaktora musi
                  zaczynać się w białej strzałce reaktora i musi zostać
                  poprowadzony do czarnej strzałki reaktora docelowego. Po
                  każdym połączeniu pojawi się w reaktorze nowe pole do
                  zdefiniowania wartości przeływu.
                </li>
                <li>
                  Uzupełnij wartości początkowe: masę i objętość pozostałych
                  reaktorów. Następnie uzupełnij wartości strumieni.
                </li>
                <li>
                  Kliknij przycisk "Sprawdź i zatwierdź". W przypadku błędu
                  walidacji (suma strumieni wpływających do reaktora musi być
                  równa sumie wypływających), należy poprawić wartości strumieni
                </li>
              </ol>
            </>
          )}
        </>
      ) : null}
    </ModelLearnContainer>
  );
};
