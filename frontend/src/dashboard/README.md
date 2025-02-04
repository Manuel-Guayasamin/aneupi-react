# Documentación del Dashboard

> [!CAUTION]
> TENER EN CUENTA QUE ESTA RAMA NO CUENTA CON EL `ADMIN_PAGES` POR MOTIVOS DE COMPATIBILIDAD CON LOS CAMBIOS EN EL BACKEND

## Propósito

El folder `dashboard` contiene el código relacionado con el desarrollo del panel de control de nuestra aplicación. Este README proporciona una guía básica sobre su estructura y cómo utilizarlo.

## Cómo Utilizar

Este folder contiene los componentes, datos, iconos, diseños y páginas necesarios para construir el panel de control de nuestra aplicación. Para más detalles sobre cómo utilizar cada parte del dashboard, consulta este README más abajito :).

## Tabla de Contenidos

1. [Instrucciones para Pruebas en Dispositivos Móviles](#instrucciones-para-pruebas-en-dispositivos-móviles)

## Instrucciones para Pruebas en Dispositivos Móviles

Para probar el funcionamiento del dashboard y la página en general en dispositivos móviles (***u otros dispositivos dentro de la red***), se recomienda ejecutar el frontend con el siguiente comando:

``` bash
npm  run  dev  --  --host
```
Esto nos dará un enlace adicional llamado Network, que es con el cual accederemos en otros dispositivos de la red:
``` bash
 VITE v5.0.12  ready in 7406 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
  ➜  press h + enter to show help

```

Antes de ejecutar este comando, asegúrate de haber actualizado la variable de entorno en el frontend `VITE_API_URL` con la dirección IP de la máquina donde se ejecutará el backend. Esta dirección IP es necesaria para que los dispositivos de la red se comuniquen correctamente con el backend. Puedes obtener la dirección IP de tu máquina (IPv4 en la mayoría de casos) utilizando el comando `ipconfig` en Windows/Linux/Mac. Por ejemplo:

> En el archivo `.env` :
> 
>     VITE_API_URL=http://192.168.x.x:5000
