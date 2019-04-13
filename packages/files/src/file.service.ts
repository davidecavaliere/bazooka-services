import { Endpoint, Lambda } from '@microgamma/apigator';
import { Log } from '@microgamma/loggator';
import { Injectable } from '@microgamma/digator';
import { APIGatewayEventRequestContext } from 'aws-lambda';
import { extension } from 'mime-types';
import S3 = require('aws-sdk/clients/s3');
import uuid = require('uuid');

@Endpoint({
  name: 'FileService',
  cors: true
})
@Injectable()
export class FileService {
  
  @Log('microgamma')
  private $l;

  private s3: S3;
  private bucket = 'microgamma-file-service-dev-attachmentsbucket-ynxxuobqz5tc';

  constructor() {
    this.s3 = new S3({
      signatureVersion: 'v4',
      // useAccelerateEndpoint: true,
      // sslEnabled: true
    });
  }

  @Lambda({
    name: 'getSignedUrl',
    method: 'POST',
    path: '/getSignedUrl'
  })
  public async getSignedUrl(metadata) {
    this.$l('got metadata', metadata);
    const url = this.s3.getSignedUrl('putObject', {
      Bucket: this.bucket,
      Metadata: metadata,
      Key: uuid.v4(metadata.filename)
    });

    return {url: url};

  }

  @Lambda({
    name: 'downloadFile',
    method: 'GET',
    path: '/getSignedUrl/{fileId}',
    integration: 'lambda-proxy'
  })
  public async downloadFile(fileId, context: APIGatewayEventRequestContext) {
    return new Promise((res, rej) => {

      this.$l('context is', context);

      this.s3.headObject({
        Bucket: this.bucket,
        Key: fileId
      }, (err, response: S3.Types.HeadObjectOutput) => {

        if (err) {
          return rej(Error(`[500] ${err}`));
        }


        if (!response) {
          return rej((Error(`[404] - object not found`)));
        }

        this.$l('got object metadata', response);

        let filename = fileId;

        if (response.Metadata.filename) {
          filename = response.Metadata.filename;
        } else {
          filename += '.' + this.mapContentType(response.ContentType);
        }

        const url = this.s3.getSignedUrl('getObject',{
          Bucket: this.bucket,
          Key: fileId,
          ResponseContentDisposition: `attachment; filename="${filename}"`
        });

        return res({
          statusCode: 301,
          headers: {
            Location: url
          },
          body: ''
        });

      });

    });
  }

  private mapContentType(ContentType: string) {
    return extension(ContentType) || 'unknown';
  }

}
