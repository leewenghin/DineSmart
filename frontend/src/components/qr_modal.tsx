import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toPng } from 'html-to-image';
import React, { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const QRModal = () => {
  const location = useLocation();
  const printqr = location.state?.printqr || []; // Access the passed data
    
  const elementRef = useRef<HTMLFormElement | null>(null);

  const htmlToImageConvert = () => {
    const element = elementRef.current;
    if (element) {
      toPng(element, { cacheBust: false })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "my-image-name.png";
          link.href = dataUrl;
          link.click();
          
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.error("Element is null. It might not be rendered yet.");
    }
  };

  useEffect(() => {
    if (printqr && printqr.length > 0) {
      htmlToImageConvert();
    }
  }, []);
  return (
    <>
      <div>
        <form action="#" encType="multipart/form-data" ref={elementRef}>
          {printqr.map((item:any) => (
            <div key={item.id}>
              <img src={item.image} alt="" />
            </div>
          ))}
        </form>
      </div>
          </>
  );
};

export default QRModal;
