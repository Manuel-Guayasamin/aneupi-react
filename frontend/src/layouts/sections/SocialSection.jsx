import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const SocialSection = () => {
	return (
		<section className='p-8 bg-colorcito'>
			<div className='max-w-screen-xl mx-auto'>
				<div className='text-center md:text-left'>
					<h2 className='text-3xl font-bold text-white md:text-5xl mb-4'>Sigue Nuestras Redes Sociales</h2>
					<p className='max-w-lg text-sm text-gray-100'>
						Entérate de las últimas noticias, eventos, cursos y mucho más.
					</p>
				</div>
				<div className='grid gap-6 md:gap-8 grid-cols-2 md:grid-cols-4 mt-8'>
					<SocialLink
						href='https://www.instagram.com/fundacion_aneupi/'
						icon={<FaInstagram className='text-4xl' />}
						text='Instagram'
					/>
					<SocialLink
						href='https://www.facebook.com/aneupi.fundacion/'
						icon={<FaFacebook className='text-4xl' />}
						text='Facebook'
					/>
					<SocialLink
						href='https://twitter.com/FundacionANEUPI/'
						icon={<FaXTwitter className='text-4xl' />}
						text='Twitter'
					/>
					<SocialLink
						href='https://www.tiktok.com/@fundacionaneupi/'
						icon={<FaTiktok className='text-4xl' />}
						text='Tiktok'
					/>
				</div>
			</div>
		</section>
	);
};

const SocialLink = ({ href, icon, text }) => (
	<a
		href={href}
		target='_blank'
		rel='noopener noreferrer'
		className='flex items-center justify-center gap-2 text-white transition duration-300 hover:scale-110 hover:-translate-y-1 bg-transparent rounded-lg p-3 border border-white hover:bg-white hover:text-colorcito'
	>
		{icon}
		<span className='text-lg md:text-xl'>{text}</span>
	</a>
);

export default SocialSection;
