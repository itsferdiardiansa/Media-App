export function formatResponse(content: any, statusCode: number, message?: string) {
  const status =
    statusCode >= 200 && statusCode < 300
      ? 'success'
      : statusCode >= 400 && statusCode < 500
      ? 'fail'
      : 'error';

  if (status === 'success') {
    return {
      status,
      code: statusCode,
      message,
      data: content ?? null,
    };
  }

  return {
    status,
    code: statusCode,
    message,
    errors: Array.isArray(content) ? content : [],
  };
}
