import React from 'react';

// Components //
import { About, Reviews, GDPRNotice, Header, FeaturesList, MoreInfoTag } from '../../components';

import { SignUpLogin } from '../../layout';

const LandingPage = () => {
	return (
		<>
			<Header />
			<SignUpLogin />
			<About />
			<FeaturesList />
			<Reviews />
			<GDPRNotice />
			<MoreInfoTag />
		</>
	);
};

export default LandingPage;
