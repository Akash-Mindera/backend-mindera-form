const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://reimbursement-portal-default-rtdb.firebaseio.com",
});

const DB =
  "mongodb+srv://AkashDey:Akash97@cluster0.jrnjcwt.mongodb.net/Reimbursement?retryWrites=true&w=majority";

const FormData = require("../model/formSchema");

mongoose
  .connect(DB, {})
  .then(() => {
    console.log("Connection to MongoDB is successfull");
  })
  .catch((err) => {
    console.log("No Connection");
  });

// FireBase Auth MiddleWare //

const checkAuth = (req, res, next) => {
  if (req.headers.authtoken) {
    admin
      .auth()
      .verifyIdToken(req.headers.authtoken)
      .then((token) => {
        // console.log(token);
        next();
      })
      .catch(() => {
        res.status(403).send("Unauthorized");
      });
  } else {
    res.status(403).send("Unauthorized");
  }
};

router.post("/formData", checkAuth, (req, res) => {
  console.log(req.body);

  const data = new FormData(req.body);

  data
    .save()
    .then(() => {
      res.status(201).json({ message: "Form is filled successfully" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Failed to fill form" }, console.log(err))
    );
});

// Get Api For Users //

router.get("/totalUserData/:UserSpecificId", checkAuth, async (req, res) => {
  fetchId = req.params.UserSpecificId;

  const data = await FormData.find({
    UserSpecificId: fetchId,
    role: "user",
  });

  res.json(data);
});

router.get("/pendingUserData/:UserSpecificId", checkAuth, async (req, res) => {
  fetchId = req.params.UserSpecificId;
  const PAGE_SIZE = 6;
  const page = parseInt(req.query.page || "0");
  const total = await FormData.countDocuments({
    UserSpecificId: fetchId,
    role: "user",
    IsApproved: "",
  });
  const data = await FormData.find({
    UserSpecificId: fetchId,
    role: "user",
    IsApproved: "",
  })
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page)
    .sort({ $natural: -1 });
  res.json({ total: Math.ceil(total / PAGE_SIZE), data });
});

router.get("/approvedUserData/:UserSpecificId", checkAuth, async (req, res) => {
  fetchId = req.params.UserSpecificId;
  const PAGE_SIZE = 6;
  const page = parseInt(req.query.page || "0");
  const total = await FormData.countDocuments({
    UserSpecificId: fetchId,
    role: "user",
    IsApproved: "Yes",
  });
  const data = await FormData.find({
    UserSpecificId: fetchId,
    role: "user",
    IsApproved: "Yes",
  })
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page)
    .sort({ $natural: -1 });
  res.json({ total: Math.ceil(total / PAGE_SIZE), data });
});

router.get("/rejectedUserData/:UserSpecificId", checkAuth, async (req, res) => {
  fetchId = req.params.UserSpecificId;
  const PAGE_SIZE = 6;
  const page = parseInt(req.query.page || "0");
  const total = await FormData.countDocuments({
    UserSpecificId: fetchId,
    role: "user",
    IsApproved: "Yes",
  });
  const data = await FormData.find({
    UserSpecificId: fetchId,
    role: "user",
    IsApproved: "No",
  })
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page)
    .sort({ $natural: -1 });
  res.json({ total: Math.ceil(total / PAGE_SIZE), data });
});

// Get Api For Approver //

router.get(
  "/totalApproverData/:UserSpecificId",
  checkAuth,
  async (req, res) => {
    fetchId = req.params.UserSpecificId;

    const data = await FormData.find({
      UserSpecificId: fetchId,
      role: "approver",
    });

    res.json(data);
  }
);

router.get(
  "/pendingApproverData/:UserSpecificId",
  checkAuth,
  async (req, res) => {
    fetchId = req.params.UserSpecificId;
    const PAGE_SIZE = 6;
    const page = parseInt(req.query.page || "0");
    const total = await FormData.countDocuments({
      UserSpecificId: fetchId,
      role: "approver",
      IsApproved: "",
    });
    const data = await FormData.find({
      UserSpecificId: fetchId,
      role: "approver",
      IsApproved: "",
    })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page)
      .sort({ $natural: -1 });
    res.json({ total: Math.ceil(total / PAGE_SIZE), data });
  }
);

router.get(
  "/approvedApproverData/:UserSpecificId",
  checkAuth,
  async (req, res) => {
    fetchId = req.params.UserSpecificId;
    const PAGE_SIZE = 6;
    const page = parseInt(req.query.page || "0");
    const total = await FormData.countDocuments({
      UserSpecificId: fetchId,
      role: "approver",
      IsApproved: "Yes",
    });
    const data = await FormData.find({
      UserSpecificId: fetchId,
      role: "approver",
      IsApproved: "Yes",
    })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({ total: Math.ceil(total / PAGE_SIZE), data });
  }
);

router.get(
  "/rejectedApproverData/:UserSpecificId",
  checkAuth,
  async (req, res) => {
    fetchId = req.params.UserSpecificId;
    const PAGE_SIZE = 6;
    const page = parseInt(req.query.page || "0");
    const total = await FormData.countDocuments({
      UserSpecificId: fetchId,
      role: "approver",
      IsApproved: "No",
    });
    const data = await FormData.find({
      UserSpecificId: fetchId,
      role: "approver",
      IsApproved: "No",
    })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({ total: Math.ceil(total / PAGE_SIZE), data });
  }
);

// Get Api For Admin //

router.get("/totalAdminData/:UserSpecificId", checkAuth, async (req, res) => {
  fetchId = req.params.UserSpecificId;

  const data = await FormData.find({
    UserSpecificId: fetchId,
    role: "admin",
  });

  res.json(data);
});

router.get("/pendingAdminData/:UserSpecificId", checkAuth, async (req, res) => {
  fetchId = req.params.UserSpecificId;
  const PAGE_SIZE = 6;
  const page = parseInt(req.query.page || "0");
  const total = await FormData.countDocuments({
    UserSpecificId: fetchId,
    role: "admin",
    IsApproved: "",
  });
  const data = await FormData.find({
    UserSpecificId: fetchId,
    role: "admin",
    IsApproved: "",
  })
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page);
  res.json({ total: Math.ceil(total / PAGE_SIZE), data });
});

router.get(
  "/approvedAdminData/:UserSpecificId",
  checkAuth,
  async (req, res) => {
    fetchId = req.params.UserSpecificId;
    const PAGE_SIZE = 6;
    const page = parseInt(req.query.page || "0");
    const total = await FormData.countDocuments({
      UserSpecificId: fetchId,
      role: "admin",
      IsApproved: "Yes",
    });
    const data = await FormData.find({
      UserSpecificId: fetchId,
      role: "admin",
      IsApproved: "Yes",
    })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({ total: Math.ceil(total / PAGE_SIZE), data });
  }
);

router.get(
  "/rejectedAdminData/:UserSpecificId",
  checkAuth,
  async (req, res) => {
    fetchId = req.params.UserSpecificId;
    const PAGE_SIZE = 6;
    const page = parseInt(req.query.page || "0");
    const total = await FormData.countDocuments({
      UserSpecificId: fetchId,
      role: "admin",
      IsApproved: "No",
    });
    const data = await FormData.find({
      UserSpecificId: fetchId,
      role: "admin",
      IsApproved: "No",
    })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({ total: Math.ceil(total / PAGE_SIZE), data });
  }
);

// Get Api For Approver for Actions //

router.get(
  "/requireActionByApprover/:approverMailId",
  checkAuth,
  async (req, res) => {
    fetchByMailId = req.params.approverMailId;
    const PAGE_SIZE = 6;
    const page = parseInt(req.query.page || "0");

    const total = await FormData.countDocuments({
      approverMailId: fetchByMailId,
      IsApproved: "",
    });
    const data = await FormData.find({
      approverMailId: fetchByMailId,
      IsApproved: "",
    })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page)
      .sort({ $natural: -1 });
    res.json({
      total: Math.ceil(total / PAGE_SIZE),
      data,
      totalRecords: total,
    });
    return;
  }
);

router.get(
  "/approvedActionByApprover/:approverMailId",
  checkAuth,
  async (req, res) => {
    fetchByMailId = req.params.approverMailId;
    const PAGE_SIZE = 6;
    const page = parseInt(req.query.page || "0");

    const total = await FormData.countDocuments({
      approverMailId: fetchByMailId,
      IsApproved: "Yes",
    });
    const data = await FormData.find({
      approverMailId: fetchByMailId,
      IsApproved: "Yes",
    })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page)
      .sort({ $natural: -1 });
    res.json({
      total: Math.ceil(total / PAGE_SIZE),
      data,
      totalRecords: total,
    });
    return;
  }
);

// Get Api For Approver for Actions using search//

router.get(
  "/requireActionByApproverUsingSearch/:approverMailId",
  checkAuth,
  async (req, res) => {
    fetchByMailId = req.params.approverMailId;
    const employeeId = req.query.employeeId;
    const createdAt = req.query.createdAt;

    if (employeeId && createdAt) {
      const data = await FormData.find({
        approverMailId: fetchByMailId,
        IsApproved: "",
        UserSpecificId: employeeId,
        createdAt: createdAt,
      }).sort({ $natural: -1 });
      res.json({ data });
    }
    if (employeeId && !createdAt) {
      const data = await FormData.find({
        approverMailId: fetchByMailId,
        IsApproved: "",
        UserSpecificId: employeeId,
      });
      res.json({ data });
    } else if (createdAt && !employeeId) {
      const data = await FormData.find({
        approverMailId: fetchByMailId,
        IsApproved: "",
        createdAt: createdAt,
      });
      res.json({ data });
    }
  }
);

router.get(
  "/approvedActionByApproverUsingSearch/:approverMailId",
  checkAuth,
  async (req, res) => {
    fetchByMailId = req.params.approverMailId;
    const employeeId = req.query.employeeId;
    const createdAt = req.query.createdAt;

    if (employeeId && createdAt) {
      const data = await FormData.find({
        approverMailId: fetchByMailId,
        IsApproved: "Yes",
        UserSpecificId: employeeId,
        createdAt: createdAt,
      });
      res.json({ data });
    } else if (employeeId && !createdAt) {
      const data = await FormData.find({
        approverMailId: fetchByMailId,
        IsApproved: "Yes",
        UserSpecificId: employeeId,
      });
      res.json({ data });
    } else if (createdAt && !employeeId) {
      const data = await FormData.find({
        approverMailId: fetchByMailId,
        IsApproved: "Yes",
        createdAt: createdAt,
      });
      res.json({ data });
    }
  }
);

// Fetching Records Using Document Id for Approver
router.get(
  "/fetchRecordsById/:reimbursementId",
  checkAuth,
  async (req, res) => {
    fetchByRemId = req.params.reimbursementId;

    const data = await FormData.find({
      _id: fetchByRemId,
      IsApproved: "",
    });

    res.json(data);
  }
);

// Patch Request for Approver - Setting Is Approved to 'Yes'

router.patch(
  "/setResponseApproved/:reimbursementId",
  checkAuth,
  async (req, res) => {
    const updates = req.body;
    console.log(updates);
    fetchByRemId = req.params.reimbursementId;

    await FormData.updateOne(
      {
        _id: fetchByRemId,
        IsApproved: "",
      },
      { $set: updates }
    )
      .then(() => {
        res.status(201).json({ message: "Update is Sucessfull" });
      })
      .catch((err) => res.status(500).json({ message: "Update Failed" }));
  }
);

module.exports = router;
