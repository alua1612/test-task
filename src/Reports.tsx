import React from 'react';
import jsPDF from 'jspdf'

export default function Categories() {

    const products = [
        {
            name: 'Shampoo',
            price: 1700,
            id: 0,
        },
        {
            name: 'Hand cream',
            price: 170000,
            id: 0,
        },
        {
            name: 'perfume',
            price: 90000,
            id: 0,
        }
    ]
    const generatePdf = () => {
 
        var doc = new jsPDF('p', 'pt');
        doc.text('Report', 20, 20)
     
        products.forEach(function(employee, i){
            doc.text(`"Name: " ${employee.name}   "price: " ${employee.price}`, 20, 60 + (i * 20));
        });
        doc.setFont('helvetica')
        // doc.addPage() // this code creates new page in pdf document
        doc.setFont('helvetica')     
     
        doc.save('sample-file.pdf')
      }

    return (
    <div>
        <button onClick={generatePdf}>Download PDF</button>
      </div>
    )
}