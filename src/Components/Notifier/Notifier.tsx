import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export function notify(type: string, title: string, message: string): void {
    switch (type) {
        case 'info':
            toastr.options = {
                positionClass: 'toast-top-right',
                hideDuration: 300,
                timeOut: 30000,
            };
            toastr.info(message, title);
            break;
        case 'success':
            toastr.options = {
                positionClass: 'toast-bottom-right',
                hideDuration: 300,
                timeOut: 30000,
            };
            toastr.success(message, title);
            break;
        case 'warning':
            toastr.options = {
                positionClass: 'toast-bottom-right',
                hideDuration: 300,
                timeOut: 30000,
            };
            toastr.warning(message, title);
            break;
        case 'error':
            toastr.options = {
                positionClass: 'toast-bottom-right',
                hideDuration: 300,
                timeOut: 30000,
            };
            toastr.error(message, title);
            break;

        default:
            toastr.options = {
                positionClass: 'toast-bottom-right',
                hideDuration: 300,
                timeOut: 60000,
            };
            toastr.clear();
            toastr.success(message, title);
    }
}

// export default { notify };

