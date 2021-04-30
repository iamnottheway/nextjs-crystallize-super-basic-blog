let tenant_id = ""; // ADD TENANT ID HERE
export default async function simplyFetchFromGraph({
  uri = `https://api.crystallize.com/${tenant_id}/catalogue`,
  query,
  variables,
}) {
  const body = JSON.stringify({ query, variables });

  const response = await fetch(uri, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}
