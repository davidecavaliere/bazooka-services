import { Endpoint, Lambda } from '@microgamma/apigator';
import { getDebugger } from '@microgamma/loggator';
import { Injectable } from '@microgamma/digator';
import S3 = require('aws-sdk/clients/s3');
import { APIGatewayEventRequestContext } from 'aws-lambda';
import { extension } from 'mime-types';
import { __listOfResourceAccessPolicy } from 'aws-sdk/clients/greengrass';

const d = getDebugger('microgamma:file:service');


@Endpoint({
  name: 'FileService',
  cors: true
})
@Injectable()
export class FileService {

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
    d('got metadata', metadata);
    const url = this.s3.getSignedUrl('putObject', {
      Bucket: this.bucket,
      Metadata: metadata,
      Key: Math.random() * 10 % 10 + ''
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

      d('context is', context);

      this.s3.headObject({
        Bucket: this.bucket,
        Key: fileId
      }, (err, response: S3.Types.HeadObjectOutput) => {

        if (err) rej(Error(`[500] ${err}`));


        if (!response) rej((Error(`[404] - object not found`)));

        d('got object metadata', response);

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


        res({
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
