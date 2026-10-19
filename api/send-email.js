import { handleEmailRequest } from '../server/handleEmailRequest.js';

export default async function handler(req, res) {
  return handleEmailRequest(req, res);
}
