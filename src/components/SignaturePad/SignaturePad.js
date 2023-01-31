import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import SignaturePad from "signature_pad";
import { Button } from "antd";
import "./SignaturePad.css";

const SignatureComponent = forwardRef(({ padNumber }, ref) => {
  const [signaturePad, setSignaturePad] = useState(null);

  useImperativeHandle(
    ref,
    () => ({
      isEmpty: () => {
        return signaturePad?.isEmpty() || true;
      },
      getJpeg: () => {
        const data = signaturePad?.toDataURL("image/jpeg");
        return data;
      },
      getPng: () => {
        const data = signaturePad?.toDataURL("image/png");
        return data;
      },
    }),
    [signaturePad]
  );

  useEffect(() => {
    var canvas = document.getElementById(`signature-pad-${padNumber}`);

    function resizeCanvas() {
      var ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
    }

    window.onresize = resizeCanvas;
    resizeCanvas();

    let signaturePad = new SignaturePad(canvas, {
      backgroundColor: "rgb(255, 255, 255)",
    });

    // document.getElementById('save-png').addEventListener('click', function () {
    //   if (signaturePad.isEmpty()) {
    //     return alert('Please provide a signature first.');
    //   }

    //   var data = signaturePad.toDataURL('image/png');
    //   console.log(data);
    //   window.open(data);
    // });

    // document.getElementById('save-jpeg').addEventListener('click', function () {
    //   if (signaturePad.isEmpty()) {
    //     return alert('Please provide a signature first.');
    //   }

    //   var data = signaturePad.toDataURL('image/jpeg');
    //   console.log(data);
    //   window.open(data);
    // });

    setSignaturePad(signaturePad);
  }, []);

  const clear = () => {
    if (signaturePad) signaturePad.clear();
  };

  return (
    <div>
      <div className="wrapper">
        <canvas
          id={`signature-pad-${padNumber}`}
          className="signature-pad"
          width={400}
          height={200}
        ></canvas>
      </div>
      <Button style={{marginTop: '.75rem'}} type="primary" onClick={clear}>
        Clear
      </Button>
    </div>
  );
});

export default SignatureComponent;
