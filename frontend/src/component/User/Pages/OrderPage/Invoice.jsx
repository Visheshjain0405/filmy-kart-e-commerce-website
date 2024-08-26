import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Logo from "../../../assets/logo.png";
import html2pdf from "html2pdf.js"
function Invoice() {
    const { id } = useParams();
    const [orders, setOrders] = useState({});
  
    useEffect(() => {
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/singleorderpage/${id}`);
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching product details', error);
        }
      };
  
      fetchProductDetails();
    }, [id]);
  
    const downloadInvoice = () => {
        const invoice = document.getElementById('invoice');

        html2pdf().from(invoice).save('invoice.pdf');
    };

    

    return (
        <div>
           
           
            
            <>
                <div
                    className="max-w-3xl mx-auto p-6 bg-white rounded shadow-sm my-6 invoice mt-[50px]"
                    id="invoice"
                >
                    <div className="grid grid-cols-2 items-center">
                        <div>
                            {/*  Company logo  */}
                            <img
                                src={Logo}
                                alt="company-logo"
                                height={100}
                                width={100}
                            />
                        </div>
                        <div className="text-right">
                            <p>Filmy Kart</p>
                            <p className="text-gray-500 text-sm">Visheshj865@gmail.com</p>
                            <p className="text-gray-500 text-sm mt-1">+91 9054353157</p>
                            <p className="text-gray-500 text-sm mt-1">A 202 Maruti Complex, Surat - 395010</p>
                        </div>
                    </div>
                    {/* Client info */}
                    <div className="grid grid-cols-2 items-center mt-8">
                        <div>
                            <p className="font-bold text-gray-800">Bill to :</p>
                            <p className="text-gray-500">
                                {orders.fullname}
                                <br />
                                {orders.address1}

                                {orders.address12}
                                <br />
                                {orders.city}  -  {orders.pincode}
                            </p>
                            <p className="text-gray-500">{orders.userEmail}</p>
                        </div>
                        <div className="text-right">
                            <p className="">
                                Invoice Id:
                                <span className="text-gray-500">  #{orders._id}</span>
                            </p>
                            <p>
                                Invoice date: <span className="text-gray-500">{orders.orderDate}</span>
                            </p>
                        </div>
                    </div>
                    {/* Invoice Items */}
                    <div className="-mx-4 mt-8 flow-root sm:mx-0">
                        <table className="min-w-full">
                            <colgroup>
                                <col className="w-full sm:w-1/2" />
                                <col className="sm:w-1/6" />
                                <col className="sm:w-1/6" />
                                <col className="sm:w-1/6" />
                            </colgroup>
                            <thead className="border-b border-gray-300 text-gray-900">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                    >
                                        Items
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                                    >
                                        Quantity
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                                    >
                                        Price
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
                                    >
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {orders.products && orders.products.map((product, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                                        <div className="font-medium text-gray-900">
                                            {product.productName}
                                        </div>

                                    </td>
                                    <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                                        {product.qty}
                                    </td>
                                    <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                                        ₹ {product.price}
                                    </td>
                                    <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                                        ₹ {product.price * product.qty}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th
                                        scope="row"
                                        colSpan={3}
                                        className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                                    >
                                        Subtotal
                                    </th>
                                    <th
                                        scope="row"
                                        className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
                                    >
                                        Subtotal
                                    </th>
                                    <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">
                                        ₹ {orders.totalPrice}
                                    </td>
                                </tr>
                                <tr>
                                    <th
                                        scope="row"
                                        colSpan={3}
                                        className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                                    >
                                        Dilivery Charges
                                    </th>
                                    <th
                                        scope="row"
                                        className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                                    >
                                        Dilivery Charges
                                    </th>
                                    <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                                        ₹ 49
                                    </td>
                                </tr>
                                <tr>
                                    <th
                                        scope="row"
                                        colSpan={3}
                                        className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                                    >
                                        Discount
                                    </th>
                                    <th
                                        scope="row"
                                        className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                                    >
                                        Discount
                                    </th>
                                    <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                                        - 10%
                                    </td>
                                </tr>
                                <tr>
                                    <th
                                        scope="row"
                                        colSpan={3}
                                        className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
                                    >
                                        Total
                                    </th>
                                    <th
                                        scope="row"
                                        className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                                    >
                                        Total
                                    </th>
                                    <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
                                        ₹ {orders.totalPrice}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    {/*  Footer  */}
                    <div className="border-t-2 pt-4 text-xs text-gray-500 text-center mt-16">
                        Please pay the invoice before the due date. You can pay the invoice by
                        logging in to your account from our client portal.
                    </div>
                </div>
                {/* <button type="button" id="btn" class="">Print</button> */}
            </>


        </div>
    )
}

export default Invoice