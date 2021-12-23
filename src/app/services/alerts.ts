import Swal from 'sweetalert2';

export class SweetAlert {
//alertas para modulo de login
    LogSuccess(){
    
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
        
        Toast.fire({
          icon: 'success',
          title: 'sesion iniciada'
        });
      }
      LogError(){
        
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
        
        Toast.fire({
          icon: 'error',
          title: 'Datos Invalidos'
        });
      }
      LogServerError(){
        
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
        
        Toast.fire({
          icon: 'error',
          title: 'Server error'
        });
      }
//alertas para modulo de agregar productos
      PsavedAlert(){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto Guardado',
          showConfirmButton: false,
          timer: 1500
        })
      }
      PAlert(){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Producto Registrado Anteriormente',
          showConfirmButton: false,
          timer: 3000
        })
      }
      PsavedErrorAlert(){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Campos Vacios o Datos invalidos',
          showConfirmButton: false,
          timer: 3000
        })
      }
//lertas para details component
    activeNotification(){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Activado',
        showConfirmButton: false,
        timer: 1500
      })
    }

    desactiveNotification(){
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Desactivado',
        showConfirmButton: false,
        timer: 1500
      })
    }
    //alertas para custome register
    savedCustomer(){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cliente Guardado',
        showConfirmButton: false,
        timer: 1500
      })
    }

    errorCustomer(){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El Cliente ya se encuentra registrado',
        showConfirmButton: false,
        timer: 1500
      })
    }
    badDataCustomer(){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Datos invalidos',
        showConfirmButton: false,
        timer: 1500
      })
    }
    //alertas para addpayment(facturacion)
    badsearch(){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ya lo has añadido',
        showConfirmButton: false,
        timer: 1500
      })
    }

    //alertas para activar y desactivar clientes multiples modulos
    statusChanged(){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Listo',
        showConfirmButton: false,
        timer: 1000
      })
    }
    //alertas para la lecutra del codigo qr en activate component 
    QRCoK(message:any){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `El usuario ha sido ${message}`,
        showConfirmButton: false,
        timer: 3000
      });
    }
    QRCError(){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `Error al activar usuario intente de nuevo`,
        showConfirmButton: false,
        timer: 3000,
      });
    }
}
