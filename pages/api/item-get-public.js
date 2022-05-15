const JSON_SERVER = 'http://127.0.0.1:3001';

// ^^ That's moser => https://github.com/fega/mongo-server => our stateful item storage
// Think of it as json-server but it talks directly to a mongo server and lets you do crud
// on entities that you're interested in. (We're hosted on Mongodb Atlas, Thanks Mongodb <3)

// We have a single entity we care about called `/items` on which you maintain hunks of components.

// Fetch hunks by id
function getItem(id) {
    return fetch(`${JSON_SERVER}/items?_id=${id}`).then((r) => r.json());
}

// Fetch hunks by name
function getItemByName(name) {
    var x = name.split('/');
    return fetch(`${JSON_SERVER}/items?siteName=${x[0]}&name=${x[1]}`).then(
        (r) => r.json(),
    );
}

export default async (req, res) => {
    // Not used anymore, kept for legacy, as we don't want to auth with firebase, web3 ftw! <3 
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
