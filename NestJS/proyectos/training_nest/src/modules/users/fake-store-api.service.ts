// external-api.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExternalApiService {
  private readonly EXTERNAL_API_BASE_URL: string;

  constructor(
    private readonly httpService: HttpService, // Inyección de HttpService
    private readonly configService: ConfigService,
  ) {
    this.EXTERNAL_API_BASE_URL = 'https://fakestoreapi.com/';
    if (!this.EXTERNAL_API_BASE_URL) {
      throw new Error('EXTERNAL_API_URL is not defined in environment variables.');
    }
  }

  async getDataFromExternalApi(param: string): Promise<any> {
    const url = `${this.EXTERNAL_API_BASE_URL}/data/${param}`;
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(url).pipe(
          catchError((error: AxiosError) => {
            console.error(`Error al llamar a la API externa: ${error.message}`);
            if (error.response) {
              throw new HttpException(
                `Error de la API externa: ${error.response.status} - ${JSON.stringify(error.response.data)}`,
                error.response.status,
              );
            } else if (error.request) {
              throw new HttpException('No se recibió respuesta de la API externa', HttpStatus.SERVICE_UNAVAILABLE);
            } else {
              throw new HttpException(`Error en la petición a la API externa: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
          }),
        ),
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async postToExternalApi(payload: any): Promise<any> {
    const url = `${this.EXTERNAL_API_BASE_URL}/submit`;
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(url, payload).pipe(
          catchError((error: AxiosError) => {
            console.error(`Error al enviar datos a la API externa: ${error.message}`);
            if (error.response) {
              throw new HttpException(
                `Error de la API externa: ${error.response.status} - ${JSON.stringify(error.response.data)}`,
                error.response.status,
              );
            } else if (error.request) {
              throw new HttpException('No se recibió respuesta de la API externa', HttpStatus.SERVICE_UNAVAILABLE);
            } else {
              throw new HttpException(`Error en la petición a la API externa: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
          }),
        ),
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}