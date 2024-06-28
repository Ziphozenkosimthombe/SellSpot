import {Link} from 'react-router-dom';
const Links = (props) => {
  return (
    <>
      <Link
        to={props.to}
        className="block px-4 py-2 hover:text-gray-400 font-bold "
      >
        {props.text}
      </Link>
    </>
  );
};

export default Links;

