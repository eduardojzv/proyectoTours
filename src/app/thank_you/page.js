import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import React from 'react'
import { redirect } from 'next/navigation';

export default async function page() {
  const SECRET = process.env.COOKIE_SECRET;
  const token = cookies().get('purchase')?.value;

  if (!token) {
    redirect("/")
  }

  verify(token, SECRET, function (err, value) {
    if (err || !value || !value.pay_state) {
      redirect("/")
    }
  });
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">¡Gracias por reservar y comprar en nuestra página de tours de islas!🙌🏽</h1>
        <p className="text-lg text-gray-700">Esperamos que disfrutes tu próximo tour.</p>
      </div>
    </div>
  );
}