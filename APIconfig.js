export const URLAPI = "http://192.168.11.104:3000";

export const GET = async () => {
  let res = await fetch(`${URLAPI}/data`);
  if (res.ok) {
    let value = await res.json();
    return value;
  }
};
export const POST = async (data) => {
  let res = await fetch(`${URLAPI}/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    console.log("POST THANH CONG");
  }
};

export const PUT = async (data) => {
  let res = await fetch(`${URLAPI}/data/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    console.log("PUT THANH CONG");
  }
};
export const DELETE = async (itemID) => {
  let res = await fetch(`${URLAPI}/data/${itemID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(itemID);
};

export const GETFROMID = async (id) => {
  let res = await fetch(`${URLAPI}/data/${id}`);
  return await res.json();
};
