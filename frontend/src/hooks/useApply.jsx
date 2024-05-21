import { useState } from 'react';
import toast from 'react-hot-toast';

const useApply = () => {
  const [isLoading, setIsLoading] = useState(false);

  const selling = async ({
    userId,
    firstName,
    lastName,
    email,
    phoneNumber,
    findUs,
    companyName,
    category,
    locatedIn,
    address,
  }) => {
    const success = handleErrors({
      firstName,
      lastName,
      email,
      phoneNumber,
      findUs,
      companyName,
      category,
      locatedIn,
      address,
    });
    if (!success) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/apply/create/${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phoneNumber,
            findUs,
            companyName,
            category,
            locatedIn,
            address,
          }),
        }
      );
      const data = await res.json();
      if (data.message === 'User not found') {
        toast.error(data.message);
        return false;
      }
      if (data.message === 'Email must match the email you use to register') {
        toast.error(data.message);
        return false;
      }
      if (data.message === 'Seller already exists') {
        toast.error(data.message);
        return false;
      }
      if (
        data.message === 'Email or Phone number or Company name already exist'
      ) {
        toast.error(data.message);
        return false;
      }
      if (data.message === 'Invalid user data') {
        toast.error(data.message);
        return false;
      }
      console.log(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { selling, isLoading };
};

export default useApply;

const handleErrors = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  findUs,
  companyName,
  category,
  locatedIn,
  address,
}) => {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !findUs ||
    !companyName ||
    !category ||
    !locatedIn ||
    !address
  ) {
    toast.error('Please fill in all fields');
    return false;
  }
  if ((firstName.length || lastName.length) < 5) {
    toast.error('Name must be at least 5 characters');
    return false;
  }
  return true;
};
