import { ClarifaiStub, grpc } from 'clarifai-nodejs-grpc'

const stub = ClarifaiStub.grpc()

const metadata = new grpc.Metadata()
metadata.set('authorization', 'Key 99edfc172f024dd18e90e69151214e8a')

/* 
  https://i.ibb.co/9ckJpX6/images-3.jpg
  https://i.ibb.co/3Rv8kpP/images-2.jpg
  https://i.ibb.co/qxjScKw/images-1.jpg
  https://i.ibb.co/YPCqXCB/images.jpg
  https://i.ibb.co/G5QyY6R/photo-1554151228-14d9def656e4.jpg
  https://i.ibb.co/YktS5Mf/BDgsok-Lv9kpxc5-Aw-Jwtexn.jpg
  https://i.ibb.co/t28npyR/Face-Mapping-191d3a2073e146d981c1626b39e8a227.png 
*/
  // 'https://media.suara.com/pictures/653x366/2019/03/03/83829-sylvester-stallone-memerankan-rambo-instagram.jpg'

  // https://i.ibb.co/89D47N3/christina-wocintechchat-com-gl-Rqy-WJg-Ue-Y-unsplash.jpg
stub.PostModelOutputs(
  {
    // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
    model_id: 'a403429f2ddf4b49b307e318f00e528b',
    inputs: [
      { data: { image: { url: input } } },
    ],
  },
  metadata,
  (err, response) => {
    if (err) {
      console.log('Error: ' + err)
      return
    }

    if (response.status.code !== 10000) {
      console.log(
        'Received failed status: ' +
          response.status.description +
          '\n' +
          response.status.details,
      )
      return
    }

    console.log('Bounding box regions:')
    console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
  },
)
