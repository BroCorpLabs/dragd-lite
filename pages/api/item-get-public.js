const JSON_SERVER = 'http://127.0.0.1:3001';

// Fetch item data
function getItem(id) {
    return fetch(`${JSON_SERVER}/items?_id=${id}`).then((r) => r.json());
}

function getItemByName(name) {
    var x = name.split('/');
    return fetch(`${JSON_SERVER}/items?siteName=${x[0]}&name=${x[1]}`).then(
        (r) => r.json(),
    );
}

export default async (req, res) => {
    const authUser = req.user;
    const { id, name } = req.query;

    const item = await (name ? getItemByName(name) : getItem(id));

    if (item.length == 0) {
        return res.send({
            status: 'error',
            message: 'Item does not exist',
        });
    }

    // Make sure authenticated user is the item owner
    if (item[0].private == true) {
        return res.send({
            status: 'error',
            message: 'Cannot fetch an item that is private.',
        });
    }

    res.send({
        status: 'success',
        data: item[0],
    });
};
