import '../../App.css';
import BreadCrumb from '../../components/navigation/BreadCrumb';
import Layout from '../layout';
import FormPage from './FormPage';

const breadcrumbLinks = [
	{ label: 'Inicio', path: '/' },
	{ label: 'Practicas', path: '/convenios/practicas' },
];

const PracticaPage = () => {
	return (
		<Layout>
			<BreadCrumb
				links={breadcrumbLinks}
				title='Practicas Universitarias'
			/>
			<div className='mt-20 space-y-4 text-center'>
				<h2 className='text-2xl font-bold md:text-6xl'>Realiza tus Practicas</h2>
				<h2 className='font-bold 1text-2xl md:text-6xl'>Modalidad Online - Presencial</h2>
			</div>
			<FormPage />
		</Layout>
	);
};

export default PracticaPage;

{
	/*
      <section className='text-gray-600 body-font'>
        <div className='max-w-screen-xl py-24 mx-auto p4'>
          <div className='flex flex-wrap justify-center -mx-4 -mb-10 text-center'>
            <div className='px-4 mb-10 sm:w-1/2'>
              <div className='h-64 overflow-hidden rounded-lg'>
                <img
                  alt='content'
                  className='object-cover object-center w-full h-full'
                  src={p1}
                />
              </div>
              <button className='mt-6 btn btn-primary w-60'>Practicas Pre Profesionales</button>
            </div>
            <div className='px-4 mb-10 sm:w-1/2'>
              <div className='h-64 overflow-hidden rounded-lg'>
                <img
                  alt='content'
                  className='object-cover object-center w-full h-full'
                  src={p2}
                />
              </div>
              <button className='mt-6 btn btn-primary w-60'>Pasantías</button>
            </div>
            <div className='px-4 mb-10 sm:w-1/2'>
              <div className='h-64 overflow-hidden rounded-lg'>
                <img
                  alt='content'
                  className='object-cover object-center w-full h-full'
                  src={p3}
                />
              </div>
              <button className='mt-6 btn btn-primary w-60'>Practicas Comunitarias</button>
            </div>
            <div className='px-4 mb-10 sm:w-1/2'>
              <div className='h-64 overflow-hidden rounded-lg'>
                <img
                  alt='content'
                  className='object-cover object-center w-full h-full'
                  src={p4}
                />
              </div>
              <button className='mt-6 btn btn-primary w-60'>Practicas para Master</button>
            </div>
          </div>
        </div>
      </section>
  */
}
