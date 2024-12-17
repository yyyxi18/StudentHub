/**
 * 異步呼叫api, 只可用響應體為 json 的 api
 * @param api 要呼叫的api
 * @returns json 結果
 */
export const asyncGet = async (api: string): Promise<any> => {
  try {
    //取得 Response 對象
    const resp: Response = await fetch(api)
    try {
      //進行json解析
      return await resp.json()
    } catch (error) {
      //如果有異常,返回異常(解析異常)
      return error
    }
  } catch (error) {
    //如果有異常,返回異常(請求異常)
    return error
  }
}

export async function asyncPost(api: string, body: {} | FormData) {
  const res: Response = await fetch(api, {
    method: 'POST',
    headers: new Headers({
      'Access-Control-Allow-Origin': "http://localhost:5173/",
      'content-Type': "application/json"
    }),
    body: body instanceof FormData ? body : JSON.stringify(body),
    mode: "cors"
  })
  try {
    let data = res.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

/**
* 發送 DELETE 請求
* @param api 要呼叫的 API
* @returns JSON 結果
*/
export const asyncDelete = async (api: string): Promise<any> => {
  try {
    const res: Response = await fetch(api, {
      method: "DELETE",
      headers: new Headers({
        "Access-Control-Allow-Origin": "http://localhost:5173/",
        "content-Type": "application/json",
      }),
      mode: "cors",
    });
    if (res.status === 204) {
      // 後端返回 204 No Content
      return { message: "Delete successful" };
    } else if (res.ok) {
      // 嘗試解析 JSON
      return await res.json();
    } else {
      throw new Error(`HTTP Error: ${res.status}`);
    }
  } catch (error) {
    console.error("刪除請求失敗:", error);
    throw error;
  }
};