import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocalStorage } from 'usehooks-ts';

const useApply = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [value] = useLocalStorage('users-auth', 0);
  const { _id: userId } = value;

  const selling = async ({
    firstName,
    lastName,
    email,
    phoneNumber,
    findUs,
    companyName,
    category,
    located,
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
      located,
      address,
    });
    if (!success) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/seller/apply/${userId}`, {
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
          located,
          address,
        }),
      });
      const data = await res.json();
      if (data.message === 'User not found') {
        toast.error(data.message);
        return false;
      }
      if (data.message) {
        toast.error(data.message);
        return false;
      }
      toast.success('Successfully applied');
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
  located,
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
    !located ||
    !address
  ) {
    toast.error('Please fill in all fields');
    return false;
  }
  if ((firstName.length || lastName.length) < 5) {
    toast.error('Name must be at least 5 characters');
    return false;
  }
  if (
    !address.streetAddress ||
    !address.Suburb ||
    !address.city ||
    !address.country ||
    !address.postalCode
  ) {
    toast.error('Please fill in all address fields');
    return false;
  }
  return true;
};
