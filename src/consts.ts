export const HTTP = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
}

export const getAllowedHosts = (): string[] => {
  return process.env.ALLOWED_HOSTS ? process.env.ALLOWED_HOSTS.split(',') : []
}

export const PER_PAGE = Number(process.env.PER_PAGE) || 5
