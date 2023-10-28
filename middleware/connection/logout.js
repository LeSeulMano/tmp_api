const logout = (req, res) => {
    res.clearCookie("token");
    return res.status(201).send({
        message: 'Logout !'
    });
}

export default logout;