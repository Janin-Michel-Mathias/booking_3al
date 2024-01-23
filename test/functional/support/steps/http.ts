import { When, Then, Given } from '@cucumber/cucumber';
import * as request from 'supertest';
import { expect } from 'chai';
import { Before, setWorldConstructor } from '@cucumber/cucumber';
import { CustomWorld } from '../world';

setWorldConstructor(CustomWorld);

Before(async function () {
  await this.initNestApp();
});

Given('I have a room named {string}', async function (this, name: string) {
  this.res = await request(this.app.getHttpServer())
    .post('/rooms')
    .send({
      name,
      description: name + 'description',
    });
  this.id = this.res.body.id;
});

Given('I have a room named {string} and a user named {string}', async function (this, roomName: string, userName: string) {
  this.res = await request(this.app.getHttpServer())
  .post('/rooms')
  .send({
    name: roomName,
    description: roomName + 'description',
  });
  this.roomId = this.res.body.id;

  this.res = await request(this.app.getHttpServer())
  .post('/users')
  .send({
    userName: userName
  });
  this.userId = this.res.body.id;
});

Given('I have a room named {string}, a user named {string} and a booking named {string}', async function (this, roomName: string, userName: string, bookingName: string) {
  this.res = await request(this.app.getHttpServer())
  .post('/rooms')
  .send({
    name: roomName,
    description: roomName + 'description',
  });
  const roomId = this.res.body.id;

  this.res = await request(this.app.getHttpServer())
  .post('/users')
  .send({
    userName: userName
  });
  const userId = this.res.body.id;

  this.res = await request(this.app.getHttpServer())
  .post('/bookings')
  .send({
    startTime: "2020-07-10 15:00:00.000",
    endTime: "2020-07-10 17:00:00.000",
    room: roomId,
    description: "reservation",
    title: bookingName,
    userId: userId
  });
  Object.keys(this).forEach(key => {
    console.log(key);
  });
  this.id = this.res.body.id;
});

When('I POST {string} with', async function (this, url: string, body: string) {
  this.res = await request(this.app.getHttpServer())
    .post(url)
    .send(JSON.parse(
      body
      .replace(':roomId', this.roomId)
      .replace(':userId', this.userId)
      ));
});

When('I GET {string}', async function (this, url: string) {
  this.res = await request(this.app.getHttpServer()).get(url);
});

Then('response status is {string}', async function (this, code: string) {
  expect(this.res.status).to.equal(parseInt(code));
});

When('I DELETE {string}', async function (this, url: string) {
  console.log(this.id);
  this.res = await request(this.app.getHttpServer())
  .delete(url.replace(':id', this.id))
  .send();
});
