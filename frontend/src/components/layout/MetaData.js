import Helmet from 'react-helmet';

const MetaData = ({ title }) => {
    return (
        <Helmet>{title}</Helmet>
    );
}

export default MetaData;