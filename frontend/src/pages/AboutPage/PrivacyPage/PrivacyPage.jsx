import BreadCrumb from '../../../components/navigation/BreadCrumb';
import Subtitle from '../../../components/ui/Subtitle';
import Layout from '../../layout';

const breadcrumbLinks = [
	{ label: 'Inicio', path: '/' },
	{ label: 'Nosotros', path: '/acerca-de-nosotros' },
	{ label: 'Políticas de Privacidad', path: '/acerca-de-nosotros/politicas-de-privacidad' },
];

const PrivacyPage = () => {
	return (
		<Layout>
			<BreadCrumb
				links={breadcrumbLinks}
				title='Políticas de Privacidad'
			/>
			<section className='p-4'>
				<article className='max-w-screen-xl py-12 mx-auto md:py-24'>
					<Subtitle title='Políticas de Privacidad' />
					<main className='!max-w-full mt-10 prose-sm md:prose prose-p:text-justify'>
						<p>
							El presente Política de Privacidad establece los términos en que ANEUPI usa y protege la
							información que es proporcionada por sus usuarios al momento de utilizar su sitio web y su
							aplicación móvil. Esta compañía está comprometida con la seguridad de los datos de sus
							usuarios. Al utilizar nuestra aplicación móvil y sitio web, usted acepta las prácticas
							descritas en esta política.{' '}
						</p>
						<ul>
							<li>
								<h3>Información que es recogida</h3>
								<p>
									Nuestra aplicación móvil y sitio web podrán recoger información personal, como el
									nombre, información de contacto como la dirección de correo electrónico, y datos
									demográficos. Asimismo, cuando sea necesario, podrá ser requerida información
									específica para procesar pedidos, realizar entregas o facturación.
								</p>
							</li>
							<li>
								<h3>Uso de la información recogida</h3>
								<p>
									Nuestra aplicación móvil y sitio web emplean la información con el fin de
									proporcionar el mejor servicio posible, mantener un registro de usuarios y mejorar
									nuestros productos y servicios. Además, es posible que se envíen correos
									electrónicos periódicamente a través de nuestro sitio y aplicación con ofertas
									especiales, nuevos productos y otra información publicitaria que consideremos
									relevante para usted o que pueda brindarle algún beneficio. Estos correos
									electrónicos serán enviados a la dirección que usted proporcione y podrán ser
									cancelados en cualquier momento. ANEUPI está altamente comprometido en cumplir con
									el compromiso de mantener su información segura. Utilizamos los sistemas más
									avanzados y los actualizamos constantemente para asegurarnos de que no exista ningún
									acceso no autorizado.
								</p>
							</li>
							<li>
								<h3>Cookies</h3>
								<p>
									Una cookie se refiere a un archivo que es enviado con la finalidad de solicitar
									permiso para almacenarse en su ordenador. Al aceptar dicho archivo se crea una
									cookie que sirve para tener información respecto al tráfico web y facilitar futuras
									visitas a la web. Nuestra aplicación móvil y sitio web emplean cookies para
									identificar las páginas que son visitadas y su frecuencia. Esta información es
									empleada únicamente para análisis estadístico, y después la información se elimina
									de forma permanente. Usted puede eliminar las cookies en cualquier momento desde su
									ordenador. Sin embargo, las cookies ayudan a proporcionar un mejor servicio de los
									sitios web. Estas no dan acceso a información de su ordenador ni de usted, a menos
									que usted así lo desee y la proporcione directamente. Usted puede aceptar o negar el
									uso de cookies, pero la mayoría de navegadores las aceptan automáticamente, pues
									sirve para tener un mejor servicio web. También puede cambiar la configuración de su
									ordenador para declinar las cookies, aunque al hacerlo es posible que no pueda
									utilizar algunos de nuestros servicios.
								</p>
							</li>
							<li>
								<h3>Enlaces a Terceros</h3>
								<p>
									Nuestra aplicación móvil y sitio web pudieran contener enlaces a otros sitios que
									pudieran ser de su interés. Una vez que usted hace clic en estos enlaces y abandona
									nuestra plataforma, ya no tenemos control sobre el sitio al que es redirigido y, por
									lo tanto, no somos responsables de los términos o privacidad ni de la protección de
									sus datos en esos otros sitios de terceros. Dichos sitios están sujetos a sus
									propias políticas de privacidad, por lo cual le recomendamos que las consulte para
									confirmar que usted está de acuerdo con ellas.
								</p>
							</li>
							<li>
								<h3>Control de su información personal</h3>
								<p>
									En cualquier momento, usted puede restringir la recopilación o el uso de la
									información personal que es proporcionada a través de nuestra aplicación móvil y
									sitio web. Cada vez que se le solicite rellenar un formulario, como el de registro
									de usuario, puede marcar o desmarcar la opción de recibir información por correo
									electrónico. En caso de que haya marcado la opción de recibir nuestro boletín o
									publicidad, usted puede cancelarla en cualquier momento.
								</p>
							</li>
						</ul>
						<p className='mt-10 text-sm italic text-neutral-500'>
							ANEUPI se reserva el derecho de cambiar los términos de la presente Política de Privacidad
							en cualquier momento. <br />
							Última actualización: 29/02/2024
						</p>
					</main>
				</article>
			</section>
		</Layout>
	);
};

export default PrivacyPage;
