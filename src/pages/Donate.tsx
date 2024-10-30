import QRCode from "react-qr-code";
import { Link } from "react-router-dom";

export const DonatePage = () => {
  return (
    <>
      <div className="mt-3" id="qrcode">
        <QRCode
          value="https://www.tinkoff.ru/rm/masalov.yuriy9/cA1x869846"
          size={300}
          className="mx-auto d-block"
        />
        <p className="text-center p-2">
          <small className="fst-italic">
            <Link to="https://www.tinkoff.ru/rm/masalov.yuriy9/cA1x869846">
              https://www.tinkoff.ru/rm/masalov.yuriy9/cA1x869846
            </Link>
          </small>
        </p>
      </div>
      <div className="text-center p-2 my-5">
        <h1>Спасибо за поддержку! 🌟</h1>
        <small className="fst-italic">Приятоного использования 🙂</small>
      </div>
    </>
  );
};
