import { JwtService } from '@nestjs/jwt';
import {Injectable,ExecutionContext, CanActivate, UnauthorizedException} from '@nestjs/common'
import { Observable } from 'rxjs';

@Injectable()
export class AdminSelfGuard implements CanActivate{

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        if(String(req.admin.id) !== req.params.id)
            {
                throw new UnauthorizedException({
                    message: "Not authorized user"
                }); 

            }    
        return true 
    }
}

