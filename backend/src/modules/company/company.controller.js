import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  getMyCompanies,
  updateCompany,
} from './company.service.js';

export const createCompanyController = async (req, res) => {
  try {
    const company = await createCompany(req.body, req.user._id);
    res.status(201).json({ success: true, data: company });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllCompaniesController = async (req, res) => {
  try {
    const companies = await getAllCompanies();
    res.status(200).json({ success: true, count: companies.length, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCompanyByIdController = async (req, res) => {
  try {
    const company = await getCompanyById(req.params.id);
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getMyCompaniesController = async (req, res) => {
  try {
    const companies = await getMyCompanies(req.user._id);
    res.status(200).json({ success: true, count: companies.length, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCompanyController = async (req, res) => {
  try {
    const company = await updateCompany(req.params.id, req.body, req.user._id);
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
