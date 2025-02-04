import React from 'react';

import BancoPichinchaLogo from '../../assets/images/pagos/logo_banco_pichincha.svg';
import PayphoneLogo from '../../assets/images/pagos/logo_payphone.jpg';
import Subtitle from '../../components/ui/Subtitle';

import Layout from '../layout';
import PayPhonePayment from '../../components/payments/PayPhonePayment';

const DonacionesPage = () => {
	return (
		<Layout>
			<section className='p-4'>
				<article className='max-w-screen-xl py-12 mx-auto md:py-24'>
					<Subtitle title='Pagos y Donaciones' />
					<main className='grid items-center max-w-full gap-10 prose md:grid-cols-2 md:gap-20'>
						<div>
							<h3>Pasos para realizar el Pago o Donación:</h3>
							<ol>
								<li>
									Ingrese la cantidad del valor que va a pagar o donar para que se generar un enlace{' '}
									<span className='font-bold'>100% seguro</span>.
								</li>
								<li>
									Haga clic en él enlace que se muestra debajo del botón{' '}
									<span className='font-bold'>generar enlace</span>.
								</li>
								<li>
									Ahora espere unos segundos y aparecerá su{' '}
									<span className='font-bold'>botón de pago</span>.
								</li>
							</ol>
							<p className='p-4 text-sm italic text-center bg-cyan-100 rounded-xl'>
								"Súmate a esta buena causa, tu aporte{' '}
								<span className='font-bold'>siempre es importante</span>. <br /> Por pequeño que parezca
								puede ayudar en grande"
							</p>
						</div>
						<PayPhonePayment />
					</main>
					<footer className='mt-10'>
						<fieldset className='items-center justify-center gap-2 text-sm md:flex text-neutral-400'>
							<div className='flex items-center justify-center gap-2 mb-2 md:order-2'>
								<a
									href='https://www.payphone.app/'
									target='_blank'
									rel='noopener noreferrer'
									className='transition md:hover:scale-105'
								>
									<img
										src={PayphoneLogo}
										alt='Logo de Payphone'
										className='w-8 rounded-full'
									/>
								</a>
								<a
									href='https://www.pichincha.com/'
									target='_blank'
									rel='noopener noreferrer'
									className='transition md:hover:scale-105'
								>
									<img
										src={BancoPichinchaLogo}
										alt='Logo del Banco Pichincha'
										className='w-8 rounded-full'
									/>
								</a>
							</div>
							<p className='italic text-center md:text-left'>Tu compra 100% segura y confíable con</p>
						</fieldset>
					</footer>
				</article>
			</section>
		</Layout>
	);
};

export default DonacionesPage;
