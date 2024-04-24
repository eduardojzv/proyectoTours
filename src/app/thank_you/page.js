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
    <div>thank_you</div>
  );
}